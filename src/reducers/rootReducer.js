import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import edit from './edit.reducer'
import pois from './pois.reducer'

const rootReducer = combineReducers({
  pois,
  stuff,
  edit,
  router: routerReducer
})

export default rootReducer
