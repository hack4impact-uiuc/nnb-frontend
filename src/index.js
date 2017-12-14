// bootstrap imports need to be before other components and css imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './Login'
import registerServiceWorker from './registerServiceWorker'

import { HashRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
    </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
