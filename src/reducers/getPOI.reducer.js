import initialState from './initialState'
import {
  POIS_LOADED,
  POI_BY_ID_LOADED,
  POI_BY_MAP_YEAR_LOADED,
  POI_BY_STORY_ID_LOADED,
  POI_CREATED,
  POI_EDITED,
  POI_DELETED
} from './../actions/actionTypes'

export default function getPoi(state = initialState.pois, action) {
  switch (action.type) {
    case POIS_LOADED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_BY_ID_LOADED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_BY_MAP_YEAR_LOADED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_BY_STORY_ID_LOADED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_CREATED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_EDITED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_DELETED:
      return {
        ...state,
        activePOIs: []
      }
    default:
      return state
  }
}
