import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function uniSearchInputChanged(value) {
  return { type: actionTypes.UNI_SEARCH_INPUT_CHANGED, payload: { value } }
}

function poisSearched(search) {
  return { type: actionTypes.POIS_SEARCHED, payload: search }
}
// function receiveList(json){
// 	return { type: actionTypes.RECEIVE_LIST, payload: json.uniFilteredList}
// }

export function updateUniSearchInput(value) {
  return dispatch => dispatch(uniSearchInputChanged(value))
}
// api wrapper for our search endpoint is not yet provided so we are using loadPOIs temporarily
export function uniSearchPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const query = store.searchPoi.query
    return Api.loadSearchPois({ query, name: true, description: true }).then(
      pois => dispatch(poisSearched(pois)) //TODO is this right??
    )
  }
}
// export function fetchResults(value){
// 	return dispatch => {
// 		return filterResults(value).then(json => dispatch(receiveList(json)))
// 	}
// }
// function filterResults(value){
//   return new Promise((resolve, reject) => {
//   	setTimeout(() => {
//   	  resolve({ uniFilteredList: Api.loadPOIs().then(stories => stories.filter(sensor => sensor.toLowerCase().includes(value.toLowerCase())))
//   	  })
//   	}, Math.random() * 50)
//   })
// }
