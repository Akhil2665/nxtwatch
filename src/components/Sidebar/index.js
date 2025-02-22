import {Link} from 'react-router-dom'

import {FaHome, FaGamepad, FaHotjar, FaSave} from 'react-icons/fa'

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
        <li className="list-item-sidebar">
          <Link to="/" className="sidebar-link-item">
            <FaHome className="sidebar-list-icon" /> <p>Home</p>
          </Link>
        </li>
        <li className="list-item-sidebar">
          <Link to="/trending" className="sidebar-link-item">
            <FaHotjar className="sidebar-list-icon" /> <p>Trending</p>
          </Link>
        </li>
        <li className="list-item-sidebar">
          <Link to="/gaming" className="sidebar-link-item">
            <FaGamepad className="sidebar-list-icon" /> <p>Gaming</p>
          </Link>
        </li>
        <li className="list-item-sidebar">
          <Link to="/saved-videos" className="sidebar-link-item">
            <FaSave className="sidebar-list-icon" /> <p>Saved Videos</p>
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
