import initialState from './initialState'
import { RECEIVE_STUFF } from '../actions/actionTypes'

export default function stuff(state = initialState.stuff, action) {
  let newState
  switch (action.type) {
    case RECEIVE_STUFF:
      newState = action.payload
      return newState
    default:
      return state
  }
}
