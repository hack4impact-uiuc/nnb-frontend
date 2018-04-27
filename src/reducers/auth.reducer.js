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
        isLoggedIn: storage.get('auth'),
        authToken: storage.get('authorizationToken')
      }
    case USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: !!action.payload,
        authorizationToken: action.payload
      }
    case USER_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        authorizationToken: ''
      }
    default:
      return state
  }
}
