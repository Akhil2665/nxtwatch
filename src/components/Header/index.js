import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'
// import {IoMenu} from 'react-icons/io5'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
// import {FiLogOut} from 'react-icons/fi'

import MobilePopupSidebar from '../MobilePopupSidebar'

import LogoutPopup from '../LogoutPopup'

// import {CiLight} from 'react-icons/ci'

import './index.css'

class Header extends Component {
  state = {
    isDarkTheme: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changeTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme} = this.state
    return (
      <nav className="nav-header">
        <div className="mobile-navbar">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png "
              alt="website logo"
              className="nav-bar-img-mobile"
            />
          </Link>
          <button type="button" className="nav-item-button">
            <BsMoon className="" />
          </button>

          <MobilePopupSidebar />
        </div>
        <div className="desktop-navbar">
          <button
            type="button"
            data-testid="theme"
            className="theme-btn"
            onClick={this.changeTheme}
          >
            {isDarkTheme ? (
              <BsBrightnessHigh className="theme-icon" />
            ) : (
              <BsMoon className="theme-icon" />
            )}
          </button>
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
              alt="profile"
              className="nav-bar-img"
            />
          </>
          <LogoutPopup onClickLogout={this.onClickLogout} />
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
