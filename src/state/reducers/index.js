import { combineReducers } from 'redux'

import { reducer as location } from 'state/routes'

// import { reducer as loggedIn } from 'Login.js'

export const reducers = combineReducers({
  location
  // loggedIn
})
