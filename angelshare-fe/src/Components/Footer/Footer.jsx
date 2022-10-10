import './Footer.scss'

const Footer = () => {
  const current = new Date()

  return (
    <div className="footer">
      <h5>
        Copyright © {current.getFullYear()} Angelshare. All rights reserved.
      </h5>
    </div>
  )
}
export default Footer
