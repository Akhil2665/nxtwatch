import {Link} from 'react-router-dom'

import './index.css'

const Sidebar = () => (
  <div className="sidebar-container">
    <div className="sidebar-nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="logo"
        className="logo"
      />
      <ul className="sidebar-list">
        <li>
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/trending" className="link-item">
            Trending
          </Link>
        </li>
        <li>
          <Link to="/gaming" className="link-item">
            Gaming
          </Link>
        </li>
        <li>
          <Link to="/saved-videos" className="link-item">
            Saved Videos
          </Link>
        </li>
      </ul>
    </div>
    <div className="social-container">
      <p className="contact-heading">Contact Us</p>
      <ul className="image-icon-list">
        <li className="image-icon-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="icon-logo"
          />
        </li>
        <li className="image-icon-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="icon-logo"
          />
        </li>
        <li className="image-icon-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="icon-logo"
          />
        </li>
      </ul>
      <p className="app-info">
        Enjoy! Now to see your channels and recommedations!
      </p>
    </div>
  </div>
)

export default Sidebar
