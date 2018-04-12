import initialState from './initialState'
import {
  UNI_SEARCH_INPUT_CHANGED,
  POIS_SEARCHED
} from './../actions/actionTypes'

export default function searchPoi(state = initialState.searchPoi, action) {
  switch (action.type) {
    case UNI_SEARCH_INPUT_CHANGED:
      return {
        ...state,
        query: action.payload.value
      }
    case POIS_SEARCHED:
      return {
        ...state,
        pois: action.payload
      }
    default:
      return state
  }
}
// export default function stuff(state = initialState.stuff, action) {
//   let newState
//   switch (action.type) {
//     case RECEIVE_STUFF:
//       newState = action.payload
//       return newState
//     default:
//       return state
//   }
// }

// export default function poiForm(state = initialState.poiForm, action) {
//   switch (action.type) {
//     case POI_FORM_INPUT_CHANGED:
//       return {
//         ...state,
//         [action.payload.field]: action.payload.value
//       }
