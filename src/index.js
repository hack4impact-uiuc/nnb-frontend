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
import { App, POIFormNew, Login, NavBar } from './components'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        <Route exact path="/" component={App} />
        <Route exact path="/form" component={POIFormNew} />
        <Route exact path="/login" component={Login} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
