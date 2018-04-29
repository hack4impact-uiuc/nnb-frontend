// bootstrap imports need to be before other components and css imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Redirect } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import configureStore, { history } from './store/configureStore'
import { Explore, FormPage, LoginPage, NavBar } from './components'
import { ToastContainer, toast } from 'react-toastify'
import {
  appLoaded,
  exitPOIForm,
  loadMaps,
  loadStories,
  setSelectedMap
} from './actions'
import registerServiceWorker from './registerServiceWorker'
import { storage } from './utils'
import './styles/toast.css'

export const ROUTES = {
  INDEX: '/',
  FORM: '/form',
  LOGIN: '/login'
}

const store = configureStore()

// dispatch the following on app load
store.dispatch(appLoaded())

loadMaps()(store.dispatch).then(action => {
  const maps = action.payload
  if (maps.length) {
    maps.sort((a, b) => a.year - b.year)
    setSelectedMap(maps[0])(store.dispatch)
  }
})
loadStories()(store.dispatch)

// dispatch actions based on route changes
history.listen(location => {
  // dunno if this is jank or not,
  // but it prevents needing to imperitively dispatch this action
  // in every case of a user leaving the form
  if (location.pathname !== ROUTES.FORM) {
    exitPOIForm()(store.dispatch)
  }
})

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !!storage.get('authorizationToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )}
  />
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        <ToastContainer style={{ color: 'red' }} />
        <Route exact path={ROUTES.INDEX} component={Explore} />
        <PrivateRoute exact path={ROUTES.FORM} component={FormPage} />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

export const toastNotify = (message, options) => toast(message, options)

registerServiceWorker()
