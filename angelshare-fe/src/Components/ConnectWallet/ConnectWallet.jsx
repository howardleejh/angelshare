import { useState, useContext, useEffect } from 'react'
import { HomePageContext } from '../../Contexts/HomePageProvider'
import { Row, Col, Button } from 'antd'
import Metamask from '../../Utilties/Metamask'
import mmFox from '../../Assets/mmfox.png'
import './ConnectWallet.scss'

const ConnectWallet = () => {
  const home = useContext(HomePageContext)

  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(null)

  const handleClick = async () => {
    setIsLoading(true)
    Metamask.connect()
      .then((results) => {
        home.storeWallet(results)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        return
      })
  }

  useEffect(() => {
    const ethereum = Metamask.check()
    if (!ethereum) {
      setDisabled(true)
      return
    }
    setDisabled(false)
  }, [])

  return (
    <Button
      ghost
      size="large"
      id="connect-btn"
      onClick={handleClick}
      loading={isLoading}
      disabled={disabled}
      className={disabled ? 'no-hover' : undefined}>
      <Row align="middle" justify="start">
        {isLoading ? undefined : (
          <>
            <Col>
              <img src={mmFox} alt="metamask logo" id="btn-prefix" />
            </Col>
            <Col>
              <p>Connect Wallet via Metamask</p>
            </Col>
          </>
        )}
      </Row>
    </Button>
  )
}
export default ConnectWallet
