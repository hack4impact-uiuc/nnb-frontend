import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function universalSearchInputChanged(value) {
  return {
    type: actionTypes.UNIVERSAL_SEARCH_INPUT_CHANGED,
    payload: { value }
  }
}

function poisUniversalSearched(search) {
  return { type: actionTypes.POIS_UNIVERSAL_SEARCHED, payload: search }
}

function storySearchInputChanged(value) {
  return {
    type: actionTypes.STORY_SEARCH_INPUT_CHANGED,
    payload: { value }
  }
}

function poisStorySearched(search) {
  return { type: actionTypes.POIS_STORY_SEARCHED, payload: search }
}

export function updateUniversalSearchInput(value) {
  return dispatch => dispatch(universalSearchInputChanged(value))
}

export function universalSearchPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const query = store.searchPoi.universalQuery
    return Api.loadSearchPois({
      query,
      name: true,
      description: true
    }).then(pois => dispatch(poisUniversalSearched(pois)))
  }
}

export function updateStorySearchInput(value) {
  return dispatch => dispatch(storySearchInputChanged(value))
}

export function storySearchPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const query = store.searchPoi.storyQuery
    return Api.loadSearchPois({
      query,
      name: true,
      description: false
    }).then(pois => dispatch(poisStorySearched(pois)))
  }
}
