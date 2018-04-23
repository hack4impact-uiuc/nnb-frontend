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
import { App, FormPage, LoginPage, NavBar } from './components'
import { appLoaded } from './actions'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()
store.dispatch(appLoaded())

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        {/* TODO: switch to use HomePage component */}
        <Route exact path="/" component={App} />
        <Route exact path="/form" component={FormPage} />
        <Route exact path="/login" component={LoginPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
