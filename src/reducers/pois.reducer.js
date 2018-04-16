import initialState from './initialState'
import {
  POIS_LOADED,
  POI_CREATED,
  POI_UPDATED,
  POI_DELETED,
  POI_SELECTED,
  NEXT_POI_IN_STORY_SET,
  PREVIOUS_POI_IN_STORY_SET
} from './../actions/actionTypes'

export default function pois(state = initialState.pois, action) {
  const { activePOIs, selectedPOIId } = state
  const selectedPOIIndex = activePOIs.findIndex(poi => poi.id === selectedPOIId)
  switch (action.type) {
    case POIS_LOADED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_CREATED:
      return {
        ...state,
        activePOIs: [...state.activePOIs, action.payload]
      }
    case POI_UPDATED:
      return {
        ...state,
        activePOIs: [...state.activePOIs].map(
          poi => (poi.id === action.payload.id ? action.payload : poi)
        )
      }
    case POI_DELETED:
      return {
        ...state,
        activePOIs: [...state.activePOIs].filter(
          poi => poi.id !== action.payload.id
        )
      }
    case POI_SELECTED:
      return {
        ...state,
        selectedPOIId: action.payload.id
      }
    case NEXT_POI_IN_STORY_SET:
      return {
        ...state,
        selectedPOIId: selectedPOIIndex + 1
      }
    case PREVIOUS_POI_IN_STORY_SET:
      return {
        ...state,
        selectedPOIId: selectedPOIIndex - 1
      }
    default:
      return state
  }
}
