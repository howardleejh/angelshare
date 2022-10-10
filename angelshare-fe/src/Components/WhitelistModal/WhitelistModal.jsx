import { useContext } from 'react'
import { HomePageContext } from '../../Contexts/HomePageProvider'
import { Modal } from 'antd'
import WhitelistForm from '../WhitlistForm/WhitlistForm'
import './WhitelistModal.scss'

const WhitelistModal = () => {
  const home = useContext(HomePageContext)

  return (
    <Modal
      visible={home.modal}
      onCancel={home.modalCancel}
      centered
      footer={null}
      className="whitelist-modal">
      <h1>Whitelist Access</h1>
      <p>
        If you're keen to secure your space for the NFT launch, please register
        with us.
      </p>
      <WhitelistForm onCompleted={home.modalCancel} />
    </Modal>
  )
}
export default WhitelistModal
