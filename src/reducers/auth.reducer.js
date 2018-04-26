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
      return {
        ...state,
        isLoggedIn: storage.get('auth')
      }
    case USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true
      }
    case USER_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state
  }
}
