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

function poiCopied(poi) {
  return { type: actionTypes.POI_COPIED, payload: poi }
}

function poiPasted(poi) {
  return { type: actionTypes.POI_LOADED, payload: poi }
}

export function loadPOIs() {
  return dispatch => {
    return Api.loadPOIs().then(pois => dispatch(poisLoaded(pois)))
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

export function copyPOI(poi) {
  return dispatch => dispatch(poiCopied(poi))
}

export function pastePOI(poi) {
  return dispatch => dispatch(poiPasted(poi))
}
