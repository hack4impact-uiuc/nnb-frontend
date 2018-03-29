import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import edit from './edit.reducer'
import maps from './maps.reducer'

const rootReducer = combineReducers({
  stuff,
  edit,
  timeline: maps,
  router: routerReducer
})

export default rootReducer
