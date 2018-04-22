import initialState from './initialState'
import {
  UNIVERSAL_SEARCH_INPUT_CHANGED,
  POIS_UNIVERSAL_SEARCHED,
  STORY_SEARCH_INPUT_CHANGED,
  POIS_STORY_SEARCHED
} from './../actions/actionTypes'

export default function searchPoi(state = initialState.searchPoi, action) {
  switch (action.type) {
    case UNIVERSAL_SEARCH_INPUT_CHANGED:
      return {
        ...state,
        universalQuery: action.payload.value
      }
    case POIS_UNIVERSAL_SEARCHED:
      return {
        ...state,
        universalPois: action.payload
      }
    case STORY_SEARCH_INPUT_CHANGED:
      return {
        ...state,
        storyQuery: action.payload.value
      }
    case POIS_STORY_SEARCHED:
      return {
        ...state,
        storyPois: action.payload
      }
    default:
      return state
  }
}
