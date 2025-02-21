import {IoCloseCircleOutline} from 'react-icons/io5'
import './index.css'

const Advertisement = props => {
  const {onClickRemoveAd} = props
  const removeAd = () => onClickRemoveAd()

  return (
    <div className="ad-container">
      <div className="logo-close-icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="web logo"
          className="ad-logo"
        />
        <button type="button" className="close-icon-button" onClick={removeAd}>
          <IoCloseCircleOutline className="close-icon" />
        </button>
      </div>
      <h1 className="ad-heading">
        Buy Nxt Watch Premium prepaid plans with UPI
      </h1>
      <button className="get-now-button" type="button">
        GET IT NOW
      </button>
    </div>
  )
}

export default Advertisement
