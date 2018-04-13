import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function uniSearchInputChanged(value) {
  return { type: actionTypes.UNI_SEARCH_INPUT_CHANGED, payload: { value } }
}

function poisSearched(search) {
  return { type: actionTypes.POIS_SEARCHED, payload: search }
}

export function updateUniSearchInput(value) {
  return dispatch => dispatch(uniSearchInputChanged(value))
}

export function uniSearchPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const query = store.searchPoi.query
    return Api.loadSearchPois({
      query,
      name: true,
      description: true
    }).then(pois => dispatch(poisSearched(pois)))
  }
}
