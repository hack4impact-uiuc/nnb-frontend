import * as actionTypes from './actionTypes'

function editModeEnabled() {
  return { type: actionTypes.EDIT_MODE_ENABLED, payload: true }
}

function editModeDisabled() {
  return { type: actionTypes.EDIT_MODE_DISABLED, payload: false }
}

export function enableEditMode() {
  return dispatch => dispatch(editModeEnabled())
}

export function disableEditMode() {
  return dispatch => dispatch(editModeDisabled())
}
