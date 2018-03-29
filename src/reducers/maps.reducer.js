import initialState from './initialState'
import { SHOW_MAP_ENABLED, SHOW_MAP_DISABLED } from '../actions/actionTypes'

export default function showMap(state = initialState.showMap, action) {
  switch (action.type) {
    case SHOW_MAP_ENABLED:
    case SHOW_MAP_DISABLED:
      return {
        ...state,
        showingMap: action.payload
      }
    default:
      return state
  }
}
