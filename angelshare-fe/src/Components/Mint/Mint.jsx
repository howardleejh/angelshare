import { useState, useContext } from 'react'
import { HomePageContext } from '../../Contexts/HomePageProvider'
import { Button, Spin } from 'antd'
import { addLeadingZeroes } from '../../Utilties/Helpers'
import Metamask from '../../Utilties/Metamask'
import nft from '../../Assets/nft-example.svg'
import contract from '../../Utilties/Contract'
import useSWR from 'swr'
import './Mint.scss'

const Mint = () => {
  const home = useContext(HomePageContext)

  const [isLoading, setIsLoading] = useState(false)

  const contractFetcher = async () => {
    let balance = await contract.balance()
    let maxSupply = await contract.totalSupply()
    return { balance, maxSupply }
  }

  const { data } = useSWR('fetchContract', contractFetcher, {
    refreshInterval: 1000
  })

  const mintNftHandler = async () => {
    setIsLoading(true)
    await Metamask.mint(contract, home.wallet.address)
    setIsLoading(false)
  }

  return (
    <div className="mint-window">
      <img src={nft} alt="nft" />
      <div className="nft-info">
        <strong>Purchase this NFT entitles you to:</strong>
        <ul>
          <li>1 x Angelshare DAO Membership</li>
          <li>1 x 32 year old cask of distinction Single Malt Whisky</li>
          <li>Access to exclusive events and venues</li>
        </ul>
      </div>
      <div className="nft-balance">
        <>
          {!data ? (
            <>
              <Spin />
            </>
          ) : (
            <>
              <span>
                {addLeadingZeroes(
                  (data.maxSupply - data.balance).toString(),
                  3
                )}
              </span>{' '}
              / <span>{data.maxSupply.toString()}</span>
            </>
          )}
        </>
      </div>
      <Button
        className="mint-btn"
        type="primary"
        onClick={mintNftHandler}
        loading={isLoading}>
        <ul className={isLoading ? 'isLoading' : undefined}>
          <li>Mint NFT</li>
          <li>
            <span>4 ETH</span>
          </li>
        </ul>
      </Button>
    </div>
  )
}
export default Mint
