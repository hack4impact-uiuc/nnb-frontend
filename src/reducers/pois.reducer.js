import initialState from './initialState'
import {
  POIS_LOADED,
  POI_CREATED,
  POI_UPDATED,
  POI_DELETED
} from './../actions/actionTypes'

export default function pois(state = initialState.pois, action) {
  switch (action.type) {
    case POIS_LOADED:
      return {
        ...state,
        activePOIs: action.payload
      }
    case POI_CREATED:
      return {
        ...state,
        activePOIs: [
          ...state.activePOIs,
          { ...action.payload.poi, id: action.payload.id }
        ]
      }
    case POI_UPDATED:
      return {
        ...state,
        activePOIs: [...state.activePOIs].map(
          poi =>
            poi.id === action.payload.id
              ? { ...action.payload.poi, id: action.payload.id }
              : poi
        )
      }
    case POI_DELETED:
      return {
        ...state,
        activePOIs: [...state.activePOIs].filter(
          poi => poi.id !== action.payload
        )
      }
    default:
      return state
  }
}
