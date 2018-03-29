import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import edit from './edit.reducer'
import showMap from './maps.reducer'

const rootReducer = combineReducers({
  stuff,
  edit,
  showMap,
  router: routerReducer
})

export default rootReducer
