import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function universalSearchInputChanged(value) {
  return {
    type: actionTypes.UNIVERSAL_SEARCH_INPUT_CHANGED,
    payload: { value }
  }
}

function universalPoisSearched(search) {
  return { type: actionTypes.UNIVERSAL_POIS_SEARCHED, payload: search }
}

function storySearchInputChanged(value) {
  return {
    type: actionTypes.STORY_SEARCH_INPUT_CHANGED,
    payload: { value }
  }
}

function storyPoisSearched(search) {
  return { type: actionTypes.STORY_POIS_SEARCHED, payload: search }
}

export function updateUniversalSearchInput(value) {
  return dispatch => dispatch(universalSearchInputChanged(value))
}

export function searchUniversalPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const query = store.searchPoi.universalQuery
    return Api.loadSearchPois({
      query,
      name: true,
      description: true
    }).then(pois => dispatch(universalPoisSearched(pois)))
  }
}

export function updateStorySearchInput(value) {
  return dispatch => dispatch(storySearchInputChanged(value))
}

export function searchStoryPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const query = store.searchPoi.storyQuery
    return Api.loadSearchPois({
      query,
      name: true,
      description: false
    }).then(pois => dispatch(storyPoisSearched(pois)))
  }
}
