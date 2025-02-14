import {IoCloseCircleOutline} from 'react-icons/io5'
import './index.css'

const Advertisement = () => (
  <div className="ad-container">
    <div className="logo-close-icon-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="web logo"
        className="ad-logo"
      />
      <button type="button" className="close-icon-button">
        <IoCloseCircleOutline className="close-icon" />
      </button>
    </div>
    <h1 className="ad-heading">Buy Nxt Watch Premium prepaid plans with UPI</h1>
    <button className="get-now-button" type="button">
      GET IT NOW
    </button>
  </div>
)

export default Advertisement
