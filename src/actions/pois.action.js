import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function poisLoaded(pois) {
  return { type: actionTypes.POIS_LOADED, payload: pois }
}

function poiCreated(poi) {
  return { type: actionTypes.POI_CREATED, payload: poi }
}

function poiUpdated(poi) {
  return { type: actionTypes.POI_UPDATED, payload: poi }
}

function poiDeleted(poiId) {
  return { type: actionTypes.POI_DELETED, payload: { id: poiId } }
}

function poiSelected(poi) {
  return { type: actionTypes.POI_SELECTED, payload: poi }
}

export function loadPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const { selectedStoryId } = store.stories
    const { selectedMapId } = store.timeline
    if (!!selectedStoryId) {
      return Api.loadPOIs({ storyId: selectedStoryId }).then(pois =>
        dispatch(poisLoaded(pois))
      )
    }
    return Api.loadPOIs({ mapYear: selectedMapId }).then(pois =>
      dispatch(poisLoaded(pois))
    )
  }
}

export function loadPOIsByMapYear(mapYear) {
  return dispatch => {
    return Api.loadPOIs({ mapYear }).then(pois => dispatch(poisLoaded(pois)))
  }
}

export function loadPOIsByStoryId(storyId) {
  return dispatch => {
    return Api.loadPOIs({ storyId }).then(pois => dispatch(poisLoaded(pois)))
  }
}

export function loadPOIById(poiId) {
  return dispatch => {
    // TODO: this will set the activePOIs to just this poi
    //       is that what we want to do?
    //       or should we push to activePOIs and set this as the selectedPOI?
    //       in which case we would need a different action type
    return Api.loadPOI(poiId).then(poi => dispatch(poisLoaded([poi])))
  }
}

export function createPOI(poi) {
  return dispatch => {
    return Api.createPOI(poi).then(poi => dispatch(poiCreated(poi)))
  }
}

export function updatePOI(poiId, poi) {
  return dispatch => {
    return Api.updatePOI(poiId, poi).then(poi => dispatch(poiUpdated(poi)))
  }
}

export function deletePOI(poiId) {
  return dispatch => {
    return Api.deletePOI(poiId).then(() => dispatch(poiDeleted(poiId)))
  }
}

export function setSelectedPOI(poi) {
  return dispatch => dispatch(poiSelected(poi))
}
