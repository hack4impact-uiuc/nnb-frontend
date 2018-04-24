import initialState from './initialState'
import {
  MAPS_LOADED,
  MAP_DELETED,
  MAP_CREATED,
  MAP_SELECTED,
  POI_SELECTED
} from '../actions/actionTypes'

export default function maps(state = initialState.timeline, action) {
  switch (action.type) {
    case MAPS_LOADED:
      const maps = [...action.payload].sort((a, b) => a.year - b.year)
      return {
        ...state,
        maps,
        selectedMapId: maps.length ? maps[0].id : null
      }
    case MAP_CREATED:
      return {
        ...state,
        maps: [...state.maps, action.payload].sort((a, b) => a.year - b.year),
        selectedMapId: action.payload.id
      }
    case MAP_DELETED:
      return {
        ...state,
        maps: [...state.maps]
          .filter(map => map.id !== action.payload.id)
          .sort((a, b) => a.year - b.year)
      }
    case MAP_SELECTED:
      return {
        ...state,
        selectedMapId: action.payload
      }
    case POI_SELECTED:
      return {
        ...state,
        selectedMapId: state.maps.find(
          map => map.year === action.payload.mapYear
        ).id
      }
    default:
      return state
  }
}
