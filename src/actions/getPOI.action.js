import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function poisLoaded(pois) {
  return { type: actionTypes.POIS_LOADED, payload: pois }
}

function poiByIdLoaded(poi) {
  return { type: actionTypes.POI_BY_ID_LOADED, payload: poi }
}

function poiByMapYearLoaded(pois) {
  return { type: actionTypes.POI_BY_MAP_YEAR_LOADED, payload: pois }
}

function poiByStoryIdLoaded(poi) {
  return { type: actionTypes.POI_BY_STORY_ID_LOADED, payload: poi }
}

function poiCreated(poi) {
  return { type: actionTypes.POI_CREATED, payload: poi }
}

function poiEdited(poi) {
  return { type: actionTypes.POI_EDITED, payload: poi }
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
    return Api.getPOI(id).then(poi => dispatch(poiByIdLoaded([poi])))
  }
}

export function getPoiByMapYear(mapYear) {
  return dispatch => {
    return Api.getPOIsByYear(mapYear).then(res =>
      dispatch(poiByMapYearLoaded(res.pois))
    )
  }
}

export function getPoiByStoryId(storyId) {
  return dispatch => {
    return Api.getPOIsByStory(storyId).then(poi =>
      dispatch(poiByStoryIdLoaded([poi]))
    )
  }
}

export function postPoi(poi) {
  return dispatch => {
    return Api.postPOI(poi).then(poi => dispatch(poiCreated([poi])))
  }
}

export function putPoi(id, poi) {
  return dispatch => {
    return Api.editPOI(id, poi).then(poi => dispatch(poiEdited([poi])))
  }
}

export function deletePoi(id) {
  return dispatch => {
    return Api.deletePOI(id).then(res => dispatch(poiDeleted(id)))
  }
}
