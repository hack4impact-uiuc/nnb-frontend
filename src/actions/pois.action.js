import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function poisLoaded(pois) {
  return { type: actionTypes.POIS_LOADED, payload: pois }
}

function poiCreated(id, poi) {
  return { type: actionTypes.POI_CREATED, payload: { id, poi } }
}

function poiEdited(id, poi) {
  return { type: actionTypes.POI_EDITED, payload: { id, poi } }
}

function poiDeleted(id) {
  return { type: actionTypes.POI_DELETED, payload: id }
}

export function loadPOIs() {
  return dispatch => {
    return Api.loadPOIs().then(poi => dispatch(poisLoaded(poi)))
  }
}

export function getPoiById(id) {
  return dispatch => {
    return Api.loadPOI(id).then(poi => dispatch(poisLoaded([poi])))
  }
}

export function loadPOIsByMapYear(mapYear) {
  return dispatch => {
    return Api.loadPOIsByYear(mapYear).then(res =>
      dispatch(poisLoaded(res.pois))
    )
  }
}

export function loadPOIsByStoryId(storyId) {
  return dispatch => {
    return Api.loadPOIsByStory(storyId).then(pois => dispatch(poisLoaded(pois)))
  }
}

export function postPoi(poi) {
  return dispatch => {
    return Api.createPOI(poi).then(res => dispatch(poiCreated(res.id, poi)))
  }
}

export function putPoi(id, poi) {
  return dispatch => {
    return Api.updatePOI(id, poi).then(dispatch(poiEdited(id, poi)))
  }
}

export function deletePoi(id) {
  return dispatch => {
    return Api.deletePOI(id).then(res => dispatch(poiDeleted(id)))
  }
}
