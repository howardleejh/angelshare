import { Space } from 'antd'
import logo from '../../Assets/main-logo.svg'
import './AppLogo.scss'

const AppHeader = () => {
  return (
    <>
      <Space direction="vertical">
        <img src={logo} alt="organization logo" id="org-logo" />
        <h1 id="logo-title">ANGELSHARE</h1>
      </Space>
    </>
  )
}
export default AppHeader
