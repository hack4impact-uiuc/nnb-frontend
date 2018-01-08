import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from 'state/store'
import { HomePage } from 'components/view/HomePage'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './styles/index.css'
// import React from 'react'
// import ReactDOM from 'resact-dom'
// import App from './App'
// import Login from './Login'
import registerServiceWorker from './registerServiceWorker'

// import { HashRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  //   <Router>
  //   <div>
  //     <Route exact path="/" component={App} />
  //     {/* <Route path="/login" component={Login} /> */}
  //   </div>
  // </Router>
  document.getElementById('root')
)

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'
// import './styles/index.css'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App'
// import Login from './Login'
// import registerServiceWorker from './registerServiceWorker'

// import { HashRouter as Router, Route } from 'react-router-dom'

// ReactDOM.render(
//   <Router>
//     <div>
//       <Route exact path="/" component={App} />
//       <Route path="/login" component={Login} />
//     </div>
//   </Router>,
//   document.getElementById('root')
// )
// registerServiceWorker()
