import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import edit from './edit.reducer'
import getPoi from './getPOI.reducer'

const rootReducer = combineReducers({
  getPoi,
  stuff,
  edit,
  router: routerReducer
})

export default rootReducer
