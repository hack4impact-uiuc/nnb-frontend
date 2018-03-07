import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'

const rootReducer = combineReducers({
  stuff,
  router: routerReducer
})

export default rootReducer
