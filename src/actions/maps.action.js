import * as actionTypes from './actionTypes'
import { loadPOIs } from './'
import { Api } from './../utils'
import { toastNotify } from './..'

function mapsLoaded(maps) {
  return { type: actionTypes.MAPS_LOADED, payload: maps }
}

function mapCreated(map) {
  return { type: actionTypes.MAP_CREATED, payload: map }
}

function mapDeleted(mapId) {
  return { type: actionTypes.MAP_DELETED, payload: { id: mapId } }
}

function mapSelected(mapId) {
  return { type: actionTypes.MAP_SELECTED, payload: mapId }
}

export function loadMaps() {
  return dispatch => Api.loadMaps().then(maps => dispatch(mapsLoaded(maps)))
}

export function createMap(map) {
  return dispatch =>
    Api.createMap(map).then(map => {
      toastNotify('Map created', { type: 'success' })
      return dispatch(mapCreated(map))
    })
}

export function deleteMap(mapId) {
  return dispatch =>
    Api.deleteMap(mapId).then(() => {
      toastNotify('Map deleted', { type: 'success' })
      return dispatch(mapDeleted(mapId))
    })
}

export function setSelectedMap(map) {
  return dispatch => {
    dispatch(mapSelected(map.id))
    dispatch(loadPOIs())
  }
}
