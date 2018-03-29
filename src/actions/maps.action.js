import * as actionTypes from './actionTypes'

function showMapEnabled() {
  return { type: actionTypes.SHOW_MAP_ENABLED, payload: true }
}

function showMapDisabled() {
  return { type: actionTypes.SHOW_MAP_DISABLED, payload: false }
}

export function enableShowMap() {
  return dispatch => dispatch(showMapEnabled())
}

export function disableShowMap() {
  return dispatch => dispatch(showMapDisabled())
}
