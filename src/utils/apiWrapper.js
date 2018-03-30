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

const POIS_URL = 'pois'
const MAPS_URL = 'maps'
const STORIES_URL = 'stories'

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
 * POIs
 */

function getPOIs(params) {
  return createRequest(
    REQUEST_METHODS.GET,
    POIS_URL,
    adapters.convertToApiGetPOI(params)
  )
    .then(res => res.result.pois)
    .then(res => res.map(adapters.convertFromApiPOI))
}

function getPOI(poiId) {
  return createRequest(REQUEST_METHODS.GET, `${POIS_URL}/${poiId}`)
    .then(res => res.result.poi)
    .then(res => adapters.convertFromApiPOI(res))
}

function postPOI(poi) {
  return createRequest(
    REQUEST_METHODS.POST,
    POIS_URL,
    adapters.convertToApiPOI(poi)
  )
    .then(res => res.result.poi)
    .then(res => adapters.convertFromApiPOI(res))
}

function editPOI(poi, poiId) {
  return createRequest(
    REQUEST_METHODS.PUT,
    `${POIS_URL}/${poiId}`,
    adapters.convertToApiPOI(poi)
  )
    .then(res => res.result.poi)
    .then(res => adapters.convertFromApiPOI(res))
}

function deletePOI(poiId) {
  return createRequest(REQUEST_METHODS.DELETE, `${POIS_URL}/${poiId}`).then(
    res => res.success
  )
}

/**
 * Maps
 */

function getMaps() {
  return createRequest(REQUEST_METHODS.GET, MAPS_URL)
    .then(res => res.result.maps)
    .then(res => res.map(adapters.convertFromApiMap))
}

function postMap(map) {
  return createRequest(
    REQUEST_METHODS.POST,
    MAPS_URL,
    adapters.convertToApiMap(map)
  )
    .then(res => res.result.map)
    .then(res => adapters.convertFromApiMap(res))
}

function deleteMap(mapId) {
  return createRequest(REQUEST_METHODS.DELETE, `${MAPS_URL}/${mapId}`).then(
    res => res.success
  )
}

/**
 * Stories
 */

function getStories(poiId) {
  return createRequest(
    REQUEST_METHODS.GET,
    STORIES_URL,
    adapters.convertToApiGetStories(poiId)
  )
    .then(res => res.result.stories)
    .then(res => res.map(adapters.convertFromApiStory))
}

function postStory(story) {
  return createRequest(
    REQUEST_METHODS.POST,
    STORIES_URL,
    adapters.convertToApiStory(story)
  )
    .then(res => res.result.story)
    .then(res => adapters.convertFromApiStory(res))
}

function editStory(story, storyId) {
  return createRequest(
    REQUEST_METHODS.PUT,
    `${STORIES_URL}/${storyId}`,
    adapters.convertToApiStory(story)
  )
    .then(res => res.result.story)
    .then(res => adapters.convertFromApiStory(res))
}

function deleteStory(storyId) {
  return createRequest(
    REQUEST_METHODS.DELETE,
    `${STORIES_URL}/${storyId}`
  ).then(res => res.success)
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

export default {
  getPOIs,
  getPOI,
  postPOI,
  editPOI,
  deletePOI,
  getMaps,
  postMap,
  deleteMap,
  getStories,
  postStory,
  editStory,
  deleteStory,
  uploadImage
}
