import Countdown, { zeroPad } from 'react-countdown'
import ReadyToMintBtn from '../ReadyToMintBtn/ReadyToMintBtn'
import './CountdownTimer.scss'

const CountdownTimer = () => {
  // time format is in timestamp in milliseconds should remain at public mint time [1663243200000]
  // temp solution to reveal mint flow
  // const now = Date.now()
  // const dDay = new Date(1663243200000)

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const timer = [
      {
        days: days
      },
      { hours: hours },
      { minutes: minutes },
      { seconds: seconds }
    ]

    return (
      <>
        {completed ? (
          <ReadyToMintBtn />
        ) : (
          <div className="countdown-timer">
            {timer.map((item) => {
              return (
                <div className="countdown-timer-box" key={Object.keys(item)}>
                  <ul>
                    <li>
                      <h2>{zeroPad(Object.values(item))}</h2>
                    </li>
                    <li>
                      <h6>{Object.keys(item)}</h6>
                    </li>
                  </ul>
                </div>
              )
            })}
            <h2 className="countdown-desc">Genesis NFT Coming Soon!</h2>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="countdown-container">
      <Countdown className="countdown-timer" date={dDay} renderer={renderer} />
    </div>
  )
}
export default CountdownTimer
