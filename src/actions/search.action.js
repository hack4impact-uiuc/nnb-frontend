import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function uniSearchInputChanged(value) {
  return { type: actionTypes.UNI_SEARCH_INPUT_CHANGED, payload: { value } }
}

function poisUniSearched(search) {
  return { type: actionTypes.POIS_UNI_SEARCHED, payload: search }
}

function editStorySearchInputChanged(value) {
  return {
    type: actionTypes.EDIT_STORY_SEARCH_INPUT_CHANGED,
    payload: { value }
  }
}

function poisEditStorySearched(search) {
  return { type: actionTypes.POIS_EDIT_STORY_SEARCHED, payload: search }
}

export function updateUniSearchInput(value) {
  return dispatch => dispatch(uniSearchInputChanged(value))
}

export function uniSearchPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const query = store.searchPoi.uniQuery
    return Api.loadSearchPois({
      query,
      name: true,
      description: true
    }).then(pois => dispatch(poisUniSearched(pois)))
  }
}

export function updateEditStorySearchInput(value) {
  return dispatch => dispatch(editStorySearchInputChanged(value))
}

export function editStorySearchPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const query = store.searchPoi.editStoryQuery
    return Api.loadSearchPois({
      query,
      name: true,
      description: false
    }).then(pois => dispatch(poisEditStorySearched(pois)))
  }
}
