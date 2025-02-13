import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: '',
    errorMsg: '',
    showPassword: false,
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onClickedShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  verifyUserData = async event => {
    event.preventDefault()
    console.log('veified')
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      errorMsg,
      showSubmitError,
      showPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const passwordType = showPassword ? 'text' : 'password'
    console.log(passwordType)

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <form className="login-form-container" onSubmit={this.verifyUserData}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label htmlFor="userName" className="input-label">
              USERNAME
            </label>
            <input
              className="input-element"
              value={username}
              type="text"
              id="userName"
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="userPassword" className="input-label">
              PASSWORD
            </label>
            <input
              className="input-element"
              value={password}
              id="userPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={this.onChangePassword}
            />
          </div>
          <div className="input-show-password-container">
            <input
              className="input-element"
              value={password}
              id="showPassword"
              type="checkbox"
              placeholder="Password"
              onClick={this.onClickedShowPassword}
            />
            <label htmlFor="showPassword" className="input-label">
              Show password
            </label>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
