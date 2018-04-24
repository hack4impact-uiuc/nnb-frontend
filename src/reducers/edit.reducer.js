import initialState from './initialState'
import { EDIT_MODE_ENABLED, EDIT_MODE_DISABLED } from '../actions/actionTypes'

export default function edit(state = initialState.edit, action) {
  switch (action.type) {
    case EDIT_MODE_ENABLED:
    case EDIT_MODE_DISABLED:
      return {
        ...state,
        isEditing: action.payload
      }
    default:
      return state
  }
}
