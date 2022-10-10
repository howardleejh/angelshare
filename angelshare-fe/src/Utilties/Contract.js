import { ethers } from 'ethers'
import { NFTMINTADDRESS } from '../Constants/Constant'
import { getWeb3Provider } from './Helpers'
import abi from '../Abi/NFTMint.json'

const provider = getWeb3Provider()
const contract = new ethers.Contract(NFTMINTADDRESS, abi, provider)

export default contract