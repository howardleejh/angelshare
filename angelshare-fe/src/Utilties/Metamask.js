import { ethers } from 'ethers'
import Notify from './Toastify'
import { getWeb3Provider } from './Helpers'

const provider = getWeb3Provider()

const Metamask = {

    check: () => {
        if (typeof window.ethereum === 'undefined') {
            Notify('Please install Metamask')
            return false
        }
        return true
    },

    connect: async () => {

        try {
            await provider.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x13881' }]
            })
            const account = await provider.provider.request({
                method: 'eth_requestAccounts'
            })
            const signer = await provider.getSigner(account[0])
            const address = await signer.getAddress()
            const rawBalance = await signer.getBalance()
            const balance = parseFloat(ethers.utils.formatEther(rawBalance)).toFixed(2)
            await signer.signMessage(`Welcome to AngelShare!\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet: ${address}`)
            return { address, balance }
        } catch (err) {
            Notify(err.message || err)
            return
        }
    },

    mint: async (contract, address) => {
        try {
            let provider = contract.provider
            let signer = await provider.getSigner(address)
            const contractWithSigner = contract.connect(signer)
            let tx = await contractWithSigner.mint()
            await tx.wait()
            Notify(`Mint is Successful!`)
        } catch (err) {
            Notify('Mint has failed, please try again')
        }
    }
}

export default Metamask 