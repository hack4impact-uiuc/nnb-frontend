import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import edit from './edit.reducer'

const rootReducer = combineReducers({
  stuff,
  edit,
  router: routerReducer
})

export default rootReducer
