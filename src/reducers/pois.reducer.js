import initialState from './initialState'
import {
  POIS_LOADED,
  POI_CREATED,
  POI_UPDATED,
  POI_DELETED,
  POI_FORM_MEDIA_REMOVED,
  POI_SELECTED,
  NEXT_POI_IN_STORY_SET,
  PREVIOUS_POI_IN_STORY_SET,
  POIS_CAROUSEL_INDEX_MODIFIED,
  NEW_POI_CREATION_STARTED,
  POI_FORM_EXITED
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
    case POI_FORM_MEDIA_REMOVED:
      return {
        ...state,
        carouselIndex: state.carouselIndex === 0 ? state.carouselIndex - 1 : 0
      }
    case POI_SELECTED:
      return {
        ...state,
        selectedPOIId: action.payload.id,
        carouselIndex: 0
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
    case POIS_CAROUSEL_INDEX_MODIFIED:
      return {
        ...state,
        carouselIndex: action.payload
      }
    case POI_FORM_EXITED:
      return {
        ...state,
        carouselIndex: 0
      }
    default:
      return state
  }
}
