import initialState from './initialState'
import { MAPS_LOADED, MAP_REMOVED, MAP_CREATED } from '../actions/actionTypes'

export default function maps(state = initialState.timeline, action) {
  switch (action.type) {
    case MAPS_LOADED:
      return {
        ...state,
        maps: action.payload
      }
    case MAP_REMOVED:
      return {
        ...state,
        maps: [...state.maps].filter(map => map != action.payload)
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
