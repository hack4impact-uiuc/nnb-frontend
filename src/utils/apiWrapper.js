import request from 'superagent'
import cloudinary from 'cloudinary'
import { apiConfig, cloudinaryConfig } from './apiConfig'
import adapters from './apiAdapters'

const REQUEST_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

cloudinary.config(cloudinaryConfig)

function createRequest(method, endpoint, options) {
  let req = request[method](`${apiConfig.apiUrl}/${endpoint}`)
  if (options) {
    if (method === REQUEST_METHODS.GET) {
      req = req.query(options)
    } else if ([REQUEST_METHODS.POST, REQUEST_METHODS.PUT].includes(method)) {
      req = req.send(options)
    }
  }
  return req.then(response => response.body).catch(err => console.error(err))
}

/**
 * Map
 */
function getMaps() {
  return createRequest(REQUEST_METHODS.GET, 'maps')
    .then(res => res.data)
    .then(res => res.map(adapters.convertFromApiMap))
}

function postMap(map) {
  return createRequest(
    REQUEST_METHODS.POST,
    'maps',
    adapters.convertToApiMap(map)
  ).then(res => res.data)
}

function deleteMap(mapId) {
  return createRequest(REQUEST_METHODS.DELETE, `maps/${mapId}`).then(
    res => res.data
  )
}

/**
 * POI
 */
function getPOIs() {
  return createRequest(REQUEST_METHODS.GET, 'pois')
    .then(res => res.data)
    .then(res => res.map(r => r.data).map(adapters.convertFromApiPOI))
}

function getPOIsByYear(year) {
  return createRequest(REQUEST_METHODS.GET, `maps/years/${year}`).then(res => {
    const pois = res.data.pois.map(adapters.convertFromApiPOI)
    const map = adapters.convertFromApiMap(res.data.map[0])
    return { map: map, pois: pois }
  })
}

function getPOIsByStory(storyId) {
  return createRequest(REQUEST_METHODS.GET, `stories/${storyId}`).then(res =>
    res.pois.map(adapters.convertFromApiPOI)
  )
}

function postPOIToStories(poi, selectedStories) {
  return createRequest(
    REQUEST_METHODS.POST,
    'stories/add/multiple',
    adapters.convertToApiStoriesMultiple(poi, selectedStories)
  )
}

function postPOI(poi) {
  return createRequest(
    REQUEST_METHODS.POST,
    'pois',
    adapters.convertToApiPOI(poi)
  ).then(res => res.data)
}

function editPOI(poiId, poi) {
  return createRequest(
    REQUEST_METHODS.PUT,
    `pois/${poiId}`,
    adapters.convertToApiPOI(poi)
  ).then(res => res.data)
}

function deletePOI(poiId) {
  return createRequest(REQUEST_METHODS.DELETE, `pois/${poiId}`).then(
    res => res.data
  )
}

/**
 * Story
 */
function getStories() {
  return createRequest(REQUEST_METHODS.GET, 'stories')
    .then(res => res.data)
    .then(res => res.map(adapters.convertFromApiStory))
}

// TODO: api should take in story id, not name
function getStory(name) {
  return createRequest(REQUEST_METHODS.GET, `stories/${name}`).then(
    res => res.data
  )
}

function postStory(storyName) {
  return createRequest(
    REQUEST_METHODS.POST,
    'stories',
    adapters.convertToApiStory(storyName)
  ).then(res => res.data)
}

function editStory(storyId, storyName) {
  return createRequest(
    REQUEST_METHODS.PUT,
    `stories/${storyId}`,
    adapters.convertToApiStory(storyName)
  ).then(res => res.data)
}

function deleteStory(storyId) {
  return createRequest(REQUEST_METHODS.DELETE, `stories/${storyId}`).then(
    res => res.data
  )
}

/**
 * Cloudinary
 */
function uploadImage(imageDataURL) {
  return cloudinary.uploader
    .upload(imageDataURL)
    .then(res => res.secure_url)
    .catch(err => console.error(err))
}

function postLogin(loginInfo) {
  return createRequest(REQUEST_METHODS.POST, 'login', loginInfo)
}

export default {
  getMaps,
  postMap,
  deleteMap,
  getPOIs,
  getPOIsByYear,
  getPOIsByStory,
  postPOIToStories,
  postPOI,
  editPOI,
  deletePOI,
  getStories,
  getStory,
  postStory,
  postLogin,
  editStory,
  deleteStory,
  uploadImage
}
