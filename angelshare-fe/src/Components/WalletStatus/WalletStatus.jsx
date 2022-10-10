import { useContext } from 'react'
import { Row, Col } from 'antd'
import { HomePageContext } from '../../Contexts/HomePageProvider'
import { ellipseAdd } from '../../Utilties/Helpers'
import './WalletStatus.scss'

const WalletStatus = () => {
  const home = useContext(HomePageContext)

  return (
    <div className="wallet">
      <Row align="middle" justify="space-between" className="wallet-status">
        <Col id="address">
          <h3>
            {home.wallet
              ? ellipseAdd(home.wallet.address, 6, 4)
              : 'Not Connected'}
          </h3>
        </Col>
        <Col id="balance">
          <h3>{home.wallet ? `${home.wallet.balance} ETH` : '0 ETH'}</h3>
        </Col>
      </Row>
    </div>
  )
}
export default WalletStatus
