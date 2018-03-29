import * as actionTypes from './actionTypes'
import { Api } from './../utils'

function mapsLoaded(maps) {
  return { type: actionTypes.MAPS_LOADED, payload: maps }
}

function mapCreated(map) {
  return { type: actionTypes.MAP_CREATED, payload: map }
}

function mapRemoved(map) {
  return { type: actionTypes.MAP_REMOVED, payload: map }
}

export function loadMaps() {
  return dispatch => Api.getMaps().then(maps => dispatch(mapsLoaded(maps)))
}

export function createMap(map) {
  return dispatch => Api.postMap(map).then(map => dispatch(mapCreated(map)))
}

export function removeMap(mapId) {
  return dispatch => Api.deleteMap(mapId).then(map => dispatch(mapRemoved(map)))
}
