import * as actionTypes from './actionTypes'
import { storage } from './../utils'

function userLoggedIn() {
  return { type: actionTypes.USER_LOGGED_IN }
}

function userLoggedOut() {
  return { type: actionTypes.USER_LOGGED_OUT }
}

// TODO: integrate with api
export function login() {
  storage.set('auth', true)
  return dispatch => dispatch(userLoggedIn())
}

export function logout() {
  storage.set('auth', false)
  return dispatch => dispatch(userLoggedOut())
}
