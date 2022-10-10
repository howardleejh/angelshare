import { useState } from 'react'
import { Button } from 'antd'
import Web3Modal from '../Web3Modal/Web3Modal'
import './ReadyToMintBtn.scss'

const ReadyToMintBtn = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal} className="ready-btn">
        Ready to Mint!
      </Button>
      {isModalVisible ? (
        <Web3Modal visible={isModalVisible} handleCancel={handleCancel} />
      ) : null}
    </>
  )
}
export default ReadyToMintBtn
