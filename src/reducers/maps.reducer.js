import initialState from './initialState'
import { MAPS_LOADED, MAP_DELETED, MAP_CREATED } from '../actions/actionTypes'

export default function maps(state = initialState.timeline, action) {
  switch (action.type) {
    case MAPS_LOADED:
      return {
        ...state,
        maps: action.payload
      }
    case MAP_DELETED:
      return {
        ...state,
        maps: [...state.maps].filter(map => map.id !== action.payload.id)
      }
    case MAP_CREATED:
      return {
        ...state,
        maps: [...state.maps, action.payload]
      }
    default:
      return state
  }
}
