import * as actionTypes from './actionTypes'

function userLoggedIn() {
  return { type: actionTypes.USER_LOGGED_IN }
}

function userLoggedOut() {
  return { type: actionTypes.USER_LOGGED_OUT }
}

// TODO: integrate with api
export function login() {
  return dispatch => dispatch(userLoggedIn())
}

export function logout() {
  return dispatch => dispatch(userLoggedOut())
}
