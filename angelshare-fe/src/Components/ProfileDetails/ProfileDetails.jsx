import { useState } from 'react'
import { Row, Col, Button, Space } from 'antd'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './ProfileDetails.scss'

const contactRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const whitelistSchema = yup.object().shape(
  {
    firstName: yup.string().min(3).max(20).required(),
    lastName: yup.string().min(1).max(20).required(),
    email: yup.string().email().required(),
    contact: yup
      .string()
      .min(8)
      .matches(contactRegExp, 'Valid contact number required')
      .required(),
    wallet: yup.string().when('wallet', {
      is: '',
      then: yup.string().nullable().optional().default(undefined),
      otherwise: yup.string().length(42)
    })
  },
  [
    ['firstName', 'wallet'],
    ['lastName', 'wallet'],
    ['email', 'wallet'],
    ['contact', 'wallet'],
    ['wallet', 'wallet']
  ]
)

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(whitelistSchema)
  })

  const handleEditProfile = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true)
    reset()
  }

  const onSubmit = (data) => {
    console.log(data)
    setIsEditing(false)
  }

  return (
    <div className="profile-details">
      <Row>
        <Col>
          <h4 className="profile-details-header">
            Displays your account details and login credentials
          </h4>
        </Col>
      </Row>
      <form>
        <Row align="middle" justify="center">
          <Col xs={24} lg={12}>
            <label>First Name</label>
            <fieldset disabled={isEditing ? false : true}>
              <input {...register('firstName')} />
            </fieldset>
            <p>{errors.firstName?.message}</p>
          </Col>
          <Col xs={24} lg={12}>
            <label>Last Name</label>
            <fieldset disabled={isEditing ? false : true}>
              <input {...register('lastName')} />
            </fieldset>
            <p>{errors.lastName?.message}</p>
          </Col>
          <Col xs={24} lg={12}>
            <label>Email</label>
            <fieldset disabled={isEditing ? false : true}>
              <input {...register('email')} />
            </fieldset>
            <p>{errors.email?.message}</p>
          </Col>
          <Col xs={24} lg={12}>
            <label>Contact</label>
            <fieldset disabled={isEditing ? false : true}>
              <input {...register('contact')} />
            </fieldset>
            <p>{errors.contact?.message}</p>
          </Col>
          <Col span={24}>
            <label>Wallet Address</label>
            <fieldset disabled={isEditing ? false : true}>
              <input {...register('wallet')} />
            </fieldset>
            <p>{errors.wallet?.message}</p>
          </Col>
          <Col span={24} className="btn-wrapper">
            <Space direction="horizontal">
              <Button type="primary" onClick={handleEditProfile}>
                Edit Profile
              </Button>
              <Button
                type="danger"
                onClick={handleSubmit(onSubmit)}
                disabled={isEditing ? false : true}>
                UPDATE
              </Button>
            </Space>
          </Col>
        </Row>
      </form>
    </div>
  )
}
export default ProfileDetails
