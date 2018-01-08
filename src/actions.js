import { createAction } from 'redux-actions'

import * as types from 'types'

import { LOGGING_IN, LOGGING_OUT } from 'types'

// ROUTING
export const routeHome = createAction(types.ROUTE_HOME)
export const routeAbout = createAction(types.ROUTE_ABOUT)
export const routeLogin = createAction(types.ROUTE_LOGIN)

// export const loggingIn = createAction(types.LOGGING_IN)
// export const loggingOut = createAction(types.LOGGING_IN)

export function login() {
  console.log('YO')
  return {
    type: LOGGING_IN
  }
}

export function logout() {
  return {
    type: LOGGING_OUT
  }
}
