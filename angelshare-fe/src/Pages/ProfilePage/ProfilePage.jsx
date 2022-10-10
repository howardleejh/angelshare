import { Row, Col, Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import ProfileDetails from '../../Components/ProfileDetails/ProfileDetails'
import './ProfilePage.scss'

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Space direction="vertical" size="large">
        <div className="profile-header">
          <Row align="middle" justify="center">
            <Col>
              <Avatar size={256} icon={<UserOutlined />} />
              <h4>
                VERIFIED <FontAwesomeIcon icon={faCircleCheck} />
              </h4>
              <h1>Matthew McConaughey</h1>
            </Col>
          </Row>
        </div>
        <div className="profile-content">
          <ProfileDetails />
        </div>
      </Space>
    </div>
  )
}
export default ProfilePage
