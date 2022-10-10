import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { db } from '../../Utilties/Firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { ethers } from 'ethers'
import * as yup from 'yup'
import 'yup-phone'
import Notify from '../../Utilties/Toastify'
import './WhitelistForm.scss'

const whitelistSchema = yup.object().shape(
  {
    fullName: yup.string().min(3).max(40).trim().required(),
    email: yup.string().email().trim().required(),
    contact: yup.string().min(8).phone().required(),
    country: yup.string().min(2).max(25).trim().required(),
    nft: yup.number().positive().min(1).max(10).required(),
    wallet: yup.string().length(42).required(),
    social: yup.string().optional()
  },
  [
    ['fullName', 'wallet'],
    ['email', 'wallet'],
    ['contact', 'wallet'],
    ['country', 'wallet'],
    ['nft', 'wallet'],
    ['wallet', 'wallet'],
    ['social', 'wallet']
  ]
)

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const WhitelistForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(whitelistSchema)
  })

  const submitForm = async (data) => {
    try {
      let isValidAddress = ethers.utils.isAddress(data.wallet)

      if (!isValidAddress) {
        Notify('Not a valid wallet address')
        return
      }

      const docRef = doc(db, 'whitelisted', `${data.wallet}`)

      let tx = await getDoc(docRef)
      if (tx.exists()) {
        Notify('Wallet already whitelisted')
        return
      }

      let fullNameArr = data.fullName.split(' ')

      await setDoc(doc(db, 'whitelisted', `${data.wallet}`), {
        firstName: fullNameArr[0],
        lastName: fullNameArr[1],
        email: data.email,
        contact: data.contact,
        country: data.country,
        social: data.social,
        organization: '',
        position: '',
        wallet: data.wallet,
        nftAllocation: data.nft
      })
      props.onCompleted()
      Notify('Whitelist registration successful!')
      reset()
    } catch (err) {
      Notify('Whitelist registration unsuccessful, please try again')
    }
  }

  return (
    <div className="whitelist-form">
      <form>
        <input {...register('fullName')} placeholder="Full Name" />
        <p>{errors.fullName?.message}</p>
        <input {...register('email')} placeholder="Email Address" />
        <p>{errors.email?.message}</p>
        <input {...register('contact')} placeholder="Contact" prefix="+65" />
        <p>{errors.contact?.message}</p>
        <input {...register('country')} placeholder="Country of Residence" />
        <p>{errors.country?.message}</p>
        <input {...register('wallet')} placeholder="Wallet" />
        <p>{errors.wallet?.message}</p>
        <input
          {...register('social')}
          placeholder="Social Profile (Optional)"
          prefix="@"
        />
        <p>{errors.social?.message}</p>
        <label style={{ color: 'rgb(120,120,120)' }}>NFT Allocation</label>
        <select {...register('nft')} className="nft-select">
          {options.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button className="btn-21" onClick={handleSubmit(submitForm)}>
          <span>SUBMIT</span>
        </button>
      </form>
    </div>
  )
}
export default WhitelistForm
