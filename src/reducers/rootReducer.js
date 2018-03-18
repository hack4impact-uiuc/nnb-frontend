import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import edit from './edit.reducer'
import stories from './stories.reducer'

const rootReducer = combineReducers({
  stories,
  stuff,
  edit,
  router: routerReducer
})

export default rootReducer
