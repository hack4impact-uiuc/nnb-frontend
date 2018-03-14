import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function pois(pois) {
  return { type: actionTypes.LOAD_POIS, payload: pois }
}

function poiById(poi) {
  return { type: actionTypes.LOAD_POI_ID, payload: poi }
}

function poiByMapYear(poi) {
  return { type: actionTypes.LOAD_POI_MAP_YEAR, payload: poi }
}

function poiByStoryId(poi) {
  return { type: actionTypes.LOAD_POI_STORY_ID, payload: poi }
}

export function getPois() {
  return dispatch => {
    return Api.getPOIs().then(poi => dispatch(pois(poi)))
  }
}

export function getPoiById(id) {
  return dispatch => {
    return Api.getPOI(Number(id)).then(pois => dispatch(poiById(pois)))
  }
}

export function getPoiByMapYear(mapYear) {
  return dispatch => {
    return Api.getPOIsByYear(Number(mapYear)).then(poi =>
      dispatch(poiByMapYear(poi))
    )
  }
}

export function getPoiByStoryId(storyId) {
  return dispatch => {
    return Api.getPOIsByStory(Number(storyId)).then(poi =>
      dispatch(poiByStoryId(poi))
    )
  }
}
