import initialState from './initialState'
import { MAP_SHOW_ENABLED, MAP_SHOW_DISABLED } from '../actions/actionTypes'

export default function map_show(state = initialState.map_show, action) {
  switch (action.type) {
    case SHOW_MAP_ENABLED:
    case SHOW_MAP_DISABLED:
      return {
        ...state,
        isEditing: action.payload
      }
    default:
      return state
  }
}
