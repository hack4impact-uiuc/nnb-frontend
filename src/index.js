// bootstrap imports need to be before other components and css imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import configureStore, { history } from './store/configureStore'
import { Explore, FormPage, LoginPage, NavBar } from './components'
import {
  appLoaded,
  exitPOIForm,
  loadMaps,
  loadStories,
  setSelectedMap
} from './actions'
import registerServiceWorker from './registerServiceWorker'

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
  maps.sort((a, b) => a.year - b.year)
  setSelectedMap(maps[0])(store.dispatch)
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

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        {/* TODO: switch to use Explore component */}
        <Route exact path={ROUTES.INDEX} component={Explore} />
        <Route exact path={ROUTES.FORM} component={FormPage} />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
