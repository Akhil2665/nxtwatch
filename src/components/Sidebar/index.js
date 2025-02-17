import {Link} from 'react-router-dom'

import './index.css'

const Sidebar = () => (
  <div className="sidebar-container">
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
        <Link to="/savedvideos" className="link-item">
          Saved Videos
        </Link>
      </li>
    </ul>
  </div>
)

export default Sidebar
