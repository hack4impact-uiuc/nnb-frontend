import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import edit from './edit.reducer'
import stories from './stories.reducer'
import pois from './pois.reducer'

const rootReducer = combineReducers({
  stories,
  pois,
  stuff,
  edit,
  router: routerReducer
})

export default rootReducer
