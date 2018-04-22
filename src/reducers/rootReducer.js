import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import edit from './edit.reducer'
import maps from './maps.reducer'
import stories from './stories.reducer'
import pois from './pois.reducer'
import poiForm from './poiForm.reducer'
import sidebar from './sidebar.reducer'
import auth from './auth.reducer'

const rootReducer = combineReducers({
  stories,
  pois,
  stuff,
  edit,
  timeline: maps,
  poiForm,
  sidebar,
  auth,
  router: routerReducer
})

export default rootReducer
