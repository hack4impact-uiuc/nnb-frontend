import request from 'superagent'
import cloudinary from 'cloudinary'
import { apiConfig, cloudinaryConfig } from './apiConfig'
import adapters from './apiAdapters'
import { storage } from './../utils'
import { toastNotify } from './..'

const REQUEST_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

const POIS_URL = 'pois'
const MAPS_URL = 'maps'
const STORIES_URL = 'stories'
const AUTH_URL = 'auth'
const SEARCH_POIS_URL = 'search/pois'

cloudinary.config(cloudinaryConfig)

function createRequest(method, endpoint, options, headers) {
  let req = request[method](`${apiConfig.apiUrl}/${endpoint}`)
  if (headers) {
    req = req.set(headers)
  }
  if (options) {
    if (method === REQUEST_METHODS.GET) {
      req = req.query(options)
    } else if ([REQUEST_METHODS.POST, REQUEST_METHODS.PUT].includes(method)) {
      req = req.send(options)
    }
  }
  return req.then(response => response.body).catch(err => {
    const errorMessage = !!err.response
      ? err.response.body.message
      : err.message
    toastNotify(errorMessage, { type: 'error' })

    // return to allow removal of the auth token from storage if it's already expired/invalid
    if (endpoint === `${AUTH_URL}/logout`) {
      return
    }

    throw errorMessage
  })
}

function createRequestWithAuth(method, endpoint, options) {
  return createRequest(method, endpoint, options, {
    'auth-token': storage.get('authorizationToken')
  })
}

/**
 * Auth
 */

function signupUser(params) {
  return createRequest(REQUEST_METHODS.POST, `${AUTH_URL}/signup`, params)
}

function loginUser(params) {
  return createRequest(REQUEST_METHODS.POST, `${AUTH_URL}/login`, params)
}

function logoutUser() {
  return createRequestWithAuth(REQUEST_METHODS.POST, `${AUTH_URL}/logout`)
}

/**
 * POIs
 */

function loadPOIs(params) {
  return createRequest(
    REQUEST_METHODS.GET,
    POIS_URL,
    adapters.convertToApiGetPOI(params)
  )
    .then(res => res.result.pois)
    .then(res => res.map(adapters.convertFromApiPOI))
}

function loadPOI(poiId) {
  return createRequest(REQUEST_METHODS.GET, `${POIS_URL}/${poiId}`)
    .then(res => res.result.poi)
    .then(res => adapters.convertFromApiPOI(res))
}

function createPOI(poi) {
  return createRequestWithAuth(
    REQUEST_METHODS.POST,
    POIS_URL,
    adapters.convertToApiPOI(poi)
  )
    .then(res => res.result.poi)
    .then(res => adapters.convertFromApiPOI(res))
    .then(res => {
      toastNotify('POI created', { type: 'success' })
      return res
    })
}

function updatePOI(poiId, poi) {
  return createRequestWithAuth(
    REQUEST_METHODS.PUT,
    `${POIS_URL}/${poiId}`,
    adapters.convertToApiPOI(poi)
  )
    .then(res => res.result.poi)
    .then(res => adapters.convertFromApiPOI(res))
    .then(res => {
      toastNotify('POI updated', { type: 'success' })
      return res
    })
}

function deletePOI(poiId) {
  return createRequestWithAuth(REQUEST_METHODS.DELETE, `${POIS_URL}/${poiId}`)
    .then(res => res.success)
    .then(res => {
      toastNotify('POI deleted', { type: 'success' })
      return res
    })
}

/**
 * Maps
 */

function loadMaps() {
  return createRequest(REQUEST_METHODS.GET, MAPS_URL)
    .then(res => res.result.maps)
    .then(res => res.map(adapters.convertFromApiMap))
}

function createMap(map) {
  return createRequestWithAuth(
    REQUEST_METHODS.POST,
    MAPS_URL,
    adapters.convertToApiMap(map)
  )
    .then(res => res.result.map)
    .then(res => adapters.convertFromApiMap(res))
    .then(res => {
      toastNotify('Map created', { type: 'success' })
      return res
    })
}

function deleteMap(mapId) {
  return createRequestWithAuth(REQUEST_METHODS.DELETE, `${MAPS_URL}/${mapId}`)
    .then(res => res.success)
    .then(res => {
      toastNotify('Map deleted', { type: 'success' })
      return res
    })
}

/**
 * Stories
 */

function loadStories(params) {
  return createRequest(
    REQUEST_METHODS.GET,
    STORIES_URL,
    !!params && adapters.convertToApiGetStories(params)
  )
    .then(res => res.result.stories)
    .then(res => res.map(adapters.convertFromApiStory))
}

function createStory(story) {
  return createRequestWithAuth(
    REQUEST_METHODS.POST,
    STORIES_URL,
    adapters.convertToApiStory(story)
  )
    .then(res => res.result.story)
    .then(res => adapters.convertFromApiStory(res))
    .then(res => {
      toastNotify('Story created', { type: 'success' })
      return res
    })
}

function updateStory(storyId, story) {
  return createRequestWithAuth(
    REQUEST_METHODS.PUT,
    `${STORIES_URL}/${storyId}`,
    adapters.convertToApiStory(story)
  )
    .then(res => res.result.story)
    .then(res => adapters.convertFromApiStory(res))
    .then(res => {
      toastNotify('Story updated', { type: 'success' })
      return res
    })
}

function deleteStory(storyId) {
  return createRequestWithAuth(
    REQUEST_METHODS.DELETE,
    `${STORIES_URL}/${storyId}`
  )
    .then(res => res.success)
    .then(res => {
      toastNotify('Story deleted', { type: 'success' })
      return res
    })
}

/**
 * Search
 */
function loadSearchPois(params) {
  return createRequest(
    REQUEST_METHODS.GET,
    SEARCH_POIS_URL,
    adapters.convertToApiSearchPois(params)
  )
    .then(res => res.result.pois)
    .then(res => res.map(adapters.convertFromApiPOI))
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
  signupUser,
  loginUser,
  logoutUser,
  loadPOIs,
  loadPOI,
  createPOI,
  updatePOI,
  deletePOI,
  loadMaps,
  createMap,
  deleteMap,
  loadStories,
  createStory,
  updateStory,
  deleteStory,
  uploadImage,
  loadSearchPois
}
