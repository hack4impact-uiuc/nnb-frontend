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

export function getPois() {
  return dispatch => {
    return Api.getPOIs().then(poi => dispatch(poisLoaded(poi)))
  }
}

export function getPoiById(id) {
  return dispatch => {
    return Api.getPOI(id).then(poi => dispatch(poisLoaded([poi])))
  }
}

export function getPoisByMapYear(mapYear) {
  return dispatch => {
    return Api.getPOIsByYear(mapYear).then(res =>
      dispatch(poisLoaded(res.pois))
    )
  }
}

export function getPoisByStoryId(storyId) {
  return dispatch => {
    return Api.getPOIsByStory(storyId).then(pois => dispatch(poisLoaded(pois)))
  }
}

export function postPoi(poi) {
  return dispatch => {
    return Api.postPOI(poi).then(res => dispatch(poiCreated(res.id, poi)))
  }
}

export function putPoi(id, poi) {
  return dispatch => {
    return Api.editPOI(id, poi).then(dispatch(poiEdited(id, poi)))
  }
}

export function deletePoi(id) {
  return dispatch => {
    return Api.deletePOI(id).then(res => dispatch(poiDeleted(id)))
  }
}
