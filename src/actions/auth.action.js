import * as actionTypes from './actionTypes'
import { storage, Api } from './../utils'

function userLoggedIn(authorizationToken) {
  return { type: actionTypes.USER_LOGGED_IN, payload: authorizationToken }
}

function userLoggedOut() {
  return { type: actionTypes.USER_LOGGED_OUT }
}

// TODO: integrate with api
export function login(params) {
  return dispatch => {
    return Api.loginUser(params).then(res => {
      if (!!res) {
        storage.set('auth', true)
        storage.set('authorizationToken', res)
      }
      return dispatch(userLoggedIn(res))
    })
  }
}

export function logout(params) {
  return dispatch => {
    return Api.logoutUser(params).then(res => {
      storage.set('auth', false)
      storage.set('authorizationToken', '')
      return dispatch(userLoggedOut())
    })
  }
}
