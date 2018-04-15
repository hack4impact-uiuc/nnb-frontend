import initialState from './initialState'
import {
  UNI_SEARCH_INPUT_CHANGED,
  POIS_UNI_SEARCHED,
  EDIT_STORY_SEARCH_INPUT_CHANGED,
  POIS_EDIT_STORY_SEARCHED
} from './../actions/actionTypes'

export default function searchPoi(state = initialState.searchPoi, action) {
  switch (action.type) {
    case UNI_SEARCH_INPUT_CHANGED:
      return {
        ...state,
        query: action.payload.value
      }
    case POIS_UNI_SEARCHED:
      return {
        ...state,
        pois: action.payload
      }
    case EDIT_STORY_SEARCH_INPUT_CHANGED:
      return {
        ...state,
        editStoryQuery: action.payload.value
      }
    case POIS_EDIT_STORY_SEARCHED:
      return {
        ...state,
        editStoryPois: action.payload
      }
    default:
      return state
  }
}
