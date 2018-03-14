import initialState from './initialState'
import {
  LOAD_POIS,
  LOAD_POI_ID,
  LOAD_POI_MAP_YEAR,
  LOAD_POI_STORY_ID
} from './../actions/actionTypes'

export default function getPoi(state = initialState, action) {
  switch (action.type) {
    case LOAD_POIS:
      return {
        ...state,
        pois: action.payload
      }
    case LOAD_POI_ID:
      return {
        ...state,
        pois: action.payload
      }
    case LOAD_POI_MAP_YEAR:
      return {
        ...state,
        pois: action.payload
      }
    case LOAD_POI_STORY_ID:
      return {
        ...state,
        pois: action.payload
      }
    default:
      return state
  }
}
