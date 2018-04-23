import initialState from './initialState'
import {
  EDIT_MODE_ENABLED,
  EDIT_MODE_DISABLED,
  NEW_POI_CREATION_STARTED,
  POI_FORM_EXITED
} from '../actions/actionTypes'

export default function edit(state = initialState.edit, action) {
  switch (action.type) {
    case EDIT_MODE_ENABLED:
    case EDIT_MODE_DISABLED:
      return {
        ...state,
        isEditing: action.payload
      }
    case NEW_POI_CREATION_STARTED:
      return {
        ...state,
        shouldShowRealTimePOI: true
      }
    case POI_FORM_EXITED:
      return {
        ...state,
        shouldShowRealTimePOI: false
      }
    default:
      return state
  }
}
