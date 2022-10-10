import { ethers } from 'ethers'

const ellipseAdd = (address, start, end) => {
  let endPosEnd = address.length
  let endPosStart = address.length - end

  return `${address.substring(0, start)}...${address.substring(
    endPosStart,
    endPosEnd
  )}`
}

const addLeadingZeroes = (value, length) => {
  return String(value).padStart(length, '0')
}

const getWeb3Provider = () => {
  if (typeof window.ethereum === 'undefined') {
    const defaultProvider = new ethers.providers.AlchemyProvider(
      `maticmum`,
      process.env.REACT_APP_ALCHEMY
    )
    return defaultProvider
  }
  const ethereum = window.ethereum
  const attachedProvider = new ethers.providers.Web3Provider(ethereum)
  return attachedProvider
}

export { ellipseAdd, addLeadingZeroes, getWeb3Provider }
