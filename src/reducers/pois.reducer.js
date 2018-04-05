import initialState from './initialState'
import {
  POIS_LOADED,
  POI_CREATED,
  POI_UPDATED,
  POI_DELETED,
  POI_COPIED,
  POI_PASTED,
  MAX_CLIPBOARD_LENGTH
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
    // temp start
    case POI_COPIED:
    case POI_PASTED:
      var newClipboard = [...state.clipboard].filter(
        poi => poi.id !== action.payload.id
      )
      if (newClipboard.length === MAX_CLIPBOARD_LENGTH) newClipboard.pop()
      newClipboard.unshift(action.payload)
      return {
        ...state,
        clipboard: newClipboard
      }
    // temp end
    default:
      return state
  }
}
