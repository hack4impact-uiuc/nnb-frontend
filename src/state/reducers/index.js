import { combineReducers } from 'redux'

import { reducer as location } from 'state/routes'

import { LOGGING_IN, LOGGING_OUT } from '../../types'

export default function changeLoginStatus(state = 0, action) {
  switch (action.type) {
    case LOGGING_IN:
      return 1
    case LOGGING_OUT:
      return 0
    default:
      return state
  }
}

export const reducers = combineReducers({
  location,
  changeLoginStatus
})
