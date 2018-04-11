import * as actionTypes from './actionTypes'

function sidebarToggled() {
  return { type: actionTypes.SIDEBAR_TOGGLED }
}

export function toggleSidebar() {
  return dispatch => dispatch(sidebarToggled())
}
