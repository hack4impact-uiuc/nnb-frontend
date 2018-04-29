import initialState from './initialState'
import {
  APP_LOADED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../actions/actionTypes'
import { storage } from './../utils'

export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case APP_LOADED:
    case USER_LOGGED_IN:
    case USER_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: !!storage.get('authorizationToken')
      }
    default:
      return state
  }
}
