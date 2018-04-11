import initialState from './initialState'
import { SIDEBAR_TOGGLED } from '../actions/actionTypes'

export default function sidebar(state = initialState.sidebar, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLED:
      return {
        ...state,
        shouldShowSidebar: !state.shouldShowSidebar
      }
    default:
      return state
  }
}
