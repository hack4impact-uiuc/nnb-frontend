import initialState from './initialState'
import {
  UNIVERSAL_SEARCH_INPUT_CHANGED,
  UNIVERSAL_POIS_SEARCHED,
  STORY_SEARCH_INPUT_CHANGED,
  STORY_POIS_SEARCHED
} from './../actions/actionTypes'

export default function searchPoi(state = initialState.searchPoi, action) {
  switch (action.type) {
    case UNIVERSAL_SEARCH_INPUT_CHANGED:
      return {
        ...state,
        universalQuery: action.payload.value
      }
    case UNIVERSAL_POIS_SEARCHED:
      return {
        ...state,
        universalPois: action.payload
      }
    case STORY_SEARCH_INPUT_CHANGED:
      return {
        ...state,
        storyQuery: action.payload.value
      }
    case STORY_POIS_SEARCHED:
      return {
        ...state,
        storyPois: action.payload
      }
    default:
      return state
  }
}
