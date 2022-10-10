import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import './Error404.scss'

const Error404 = () => {
  return (
    <div className="error-page">
      <Row>
        <Col>
          <h1>Work In Progress</h1>
          <Link to="/" replace>
            Back Home
          </Link>
        </Col>
      </Row>
    </div>
  )
}
export default Error404
