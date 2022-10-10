import { useContext, useEffect, Suspense } from 'react'
import { Modal, Row, Spin } from 'antd'
import { HomePageContext } from '../../Contexts/HomePageProvider'
import Metamask from '../../Utilties/Metamask'
import WalletStatus from '../WalletStatus/WalletStatus'
import ConnectWallet from '../ConnectWallet/ConnectWallet'
import Mint from '../Mint/Mint'
import './Web3Modal.scss'

const Web3Modal = (props) => {
  const home = useContext(HomePageContext)
  const wallet = home.wallet

  useEffect(() => {
    const isMetamask = Metamask.check()

    if (!isMetamask) {
      return
    }

    const ethereum = window.ethereum

    ethereum.on('accountsChanged', () => {
      home.storeWallet(null)
    })

    ethereum.on('chainChanged', () => {
      home.storeWallet(null)
    })

    return () => {
      console.log('unmounted')
      ethereum.removeAllListeners(['accountsChanged', 'chainChanged'])
    }

    // eslint-disable-next-line
  }, [wallet])

  return (
    <Modal
      destroyOnClose
      centered
      visible={props.visible}
      onCancel={props.handleCancel}
      footer={null}
      className="mint-modal">
      <Row align="middle" justify="center">
        <WalletStatus />
      </Row>
      <Row align="middle" justify="center" className="mint-wrapper">
        {wallet ? (
          <Suspense fallback={<Spin />}>
            <Mint />
          </Suspense>
        ) : (
          <ConnectWallet />
        )}
      </Row>
    </Modal>
  )
}
export default Web3Modal
