import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth.reducer'
import edit from './edit.reducer'
import maps from './maps.reducer'
import poiForm from './poiForm.reducer'
import pois from './pois.reducer'
import sidebar from './sidebar.reducer'
import stories from './stories.reducer'

const rootReducer = combineReducers({
  auth,
  edit,
  poiForm,
  pois,
  router: routerReducer,
  sidebar,
  stories,
  timeline: maps
})

export default rootReducer
