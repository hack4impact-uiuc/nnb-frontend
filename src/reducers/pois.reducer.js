import initialState from './initialState'
import {
  POIS_LOADED,
  POI_CREATED,
  POI_UPDATED,
  POI_DELETED,
  POI_SELECTED,
  POI_SELECTED_FOR_PREVIEW,
  NEXT_POI_IN_STORY_SET,
  PREVIOUS_POI_IN_STORY_SET,
  NEW_POI_CREATION_STARTED
} from './../actions/actionTypes'

export default function pois(state = initialState.pois, action) {
  const { activePOIs, selectedPOIId, previewedPOIId } = state
  const selectedPOIIndex = activePOIs.findIndex(poi => poi.id === selectedPOIId)
  const previewedPOIIndex = activePOIs.findIndex(
    poi => poi.id === previewedPOIId
  )
  switch (action.type) {
    case POIS_LOADED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_CREATED:
      return {
        ...state,
        activePOIs: [...state.activePOIs, action.payload],
        selectedPOIId: action.payload.id
      }
    case POI_UPDATED:
      return {
        ...state,
        activePOIs: [...state.activePOIs].map(
          poi => (poi.id === action.payload.id ? action.payload : poi)
        ),
        selectedPOIId: action.payload.id
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
    case POI_SELECTED_FOR_PREVIEW:
      return {
        ...state,
        previewedPOIId: action.payload.id
      }
    case NEXT_POI_IN_STORY_SET:
      return {
        ...state,
        selectedPOIId: activePOIs[selectedPOIIndex + 1].id
      }
    case PREVIOUS_POI_IN_STORY_SET:
      return {
        ...state,
        selectedPOIId: activePOIs[selectedPOIIndex - 1].id
      }
    case NEW_POI_CREATION_STARTED:
      return {
        ...state,
        selectedPOIId: null
      }
    default:
      return state
  }
}
