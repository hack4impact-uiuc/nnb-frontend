import * as actionTypes from './actionTypes'

function show_maps_enable() {
  return { type: actionTypes.SHOW_MAP_ENABLED, payload: true }
}

function show_maps_disable() {
  return { type: actionTypes.SHOW_MAP_DISABLED, payload: false }
}

export function enableShowMapsMode() {
  return dispatch => dispatch(show_maps_enable())
}

export function disableShowMapsMode() {
  return dispatch => dispatch(show_maps_disable())
}
