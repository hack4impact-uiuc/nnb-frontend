import * as actionTypes from './actionTypes'
import { Api } from './../utils'

function mapsLoaded(maps) {
  return { type: actionTypes.MAPS_LOADED, payload: maps }
}

function mapCreated(map) {
  return { type: actionTypes.MAP_CREATED, payload: map }
}

function mapDeleted(map) {
  return { type: actionTypes.MAP_DELETED, payload: map }
}

export function loadMaps() {
  return dispatch => Api.loadMaps().then(maps => dispatch(mapsLoaded(maps)))
}

export function createMap(map) {
  return dispatch => Api.createMap(map).then(map => dispatch(mapCreated(map)))
}

export function deleteMap(mapId) {
  return dispatch => Api.deleteMap(mapId).then(map => dispatch(mapDeleted(map)))
}
