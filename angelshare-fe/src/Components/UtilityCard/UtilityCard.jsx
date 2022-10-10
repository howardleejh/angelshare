import './UtilityCard.scss'

const UtilityCard = (props) => {
  return (
    <div
      className="utility-card"
      style={{
        background: `#000000 url(${props.img}) no-repeat`,
        backgroundSize: `cover`
      }}>
      <div className="utility-card-content">
        <p>{props.description}</p>
      </div>
    </div>
  )
}
export default UtilityCard
