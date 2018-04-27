import * as actionTypes from './actionTypes'
import { storage, Api } from './../utils'

function userLoggedIn() {
  return { type: actionTypes.USER_LOGGED_IN }
}

function userLoggedOut() {
  return { type: actionTypes.USER_LOGGED_OUT }
}

// TODO: integrate with api
export function login(params) {
  return dispatch => {
    return Api.loginUser(params)
      .then(res => storage.set('authorizationToken', res.result.token))
      .then(() => dispatch(userLoggedIn()))
  }
}

export function logout() {
  return dispatch => {
    return Api.logoutUser()
      .then(() => storage.set('authorizationToken', ''))
      .then(() => dispatch(userLoggedOut()))
  }
}
