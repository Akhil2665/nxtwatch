import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
// import ProductItemDetails from './components/ProductItemDetails'
// import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideosContext from './context/VideosContext'

import './App.css'

class App extends Component {
  state = {
    savedVideosList: [],
  }

  render() {
    const {savedVideosList} = this.state

    return (
      <VideosContext.Provider
        value={{
          savedVideosList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />

          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </VideosContext.Provider>
    )
  }
}

export default App

// <ProtectedRoute exact path="/products" component={Products} />
//           <ProtectedRoute
//             exact
//             path="/products/:id"
//             component={ProductItemDetails}
//           />
//           <ProtectedRoute exact path="/cart" component={Cart} />
