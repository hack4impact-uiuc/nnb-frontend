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
const AUTH_URL = 'auth'

cloudinary.config(cloudinaryConfig)

function createRequest(method, endpoint, headers, options) {
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
    console.error(err)
    return err.response.body
  })
}

function createRequestWithAuth(method, endpoint, authorizationToken, options) {
  return createRequest(
    method,
    endpoint,
    { 'auth-token': authorizationToken },
    options
  )
}

/**
 * Auth
 */

function signupUser(params) {
  return createRequest(
    REQUEST_METHODS.POST,
    `${AUTH_URL}/signup`,
    {},
    params
  ).then(res => (!!res.result.token ? res.result.token : ''))
}

function loginUser(params) {
  return createRequest(
    REQUEST_METHODS.POST,
    `${AUTH_URL}/login`,
    {},
    params
  ).then(res => (!!res.result.token ? res.result.token : ''))
}

function logoutUser(authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.POST,
    `${AUTH_URL}/logout`,
    authorizationToken
  ).then(res => res)
}

/**
 * POIs
 */

function loadPOIs(params) {
  return createRequest(
    REQUEST_METHODS.GET,
    POIS_URL,
    {},
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

function createPOI(poi, authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.POST,
    POIS_URL,
    authorizationToken,
    adapters.convertToApiPOI(poi)
  )
    .then(res => res.result.poi)
    .then(res => adapters.convertFromApiPOI(res))
}

function updatePOI(poiId, poi, authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.PUT,
    `${POIS_URL}/${poiId}`,
    authorizationToken,
    adapters.convertToApiPOI(poi)
  )
    .then(res => res.result.poi)
    .then(res => adapters.convertFromApiPOI(res))
}

function deletePOI(poiId, authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.DELETE,
    `${POIS_URL}/${poiId}`,
    authorizationToken
  ).then(res => res.success)
}

/**
 * Maps
 */

function loadMaps() {
  return createRequest(REQUEST_METHODS.GET, MAPS_URL)
    .then(res => res.result.maps)
    .then(res => res.map(adapters.convertFromApiMap))
}

function createMap(map, authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.POST,
    MAPS_URL,
    authorizationToken,
    adapters.convertToApiMap(map)
  )
    .then(res => res.result.map)
    .then(res => adapters.convertFromApiMap(res))
}

function deleteMap(mapId, authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.DELETE,
    `${MAPS_URL}/${mapId}`,
    authorizationToken
  ).then(res => res.success)
}

/**
 * Stories
 */

function loadStories(params) {
  return createRequest(
    REQUEST_METHODS.GET,
    STORIES_URL,
    {},
    !!params && adapters.convertToApiGetStories(params)
  )
    .then(res => res.result.stories)
    .then(res => res.map(adapters.convertFromApiStory))
}

function createStory(story, authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.POST,
    STORIES_URL,
    authorizationToken,
    adapters.convertToApiStory(story)
  )
    .then(res => res.result.story)
    .then(res => adapters.convertFromApiStory(res))
}

function updateStory(storyId, story, authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.PUT,
    `${STORIES_URL}/${storyId}`,
    authorizationToken,
    adapters.convertToApiStory(story)
  )
    .then(res => res.result.story)
    .then(res => adapters.convertFromApiStory(res))
}

function deleteStory(storyId, authorizationToken) {
  return createRequestWithAuth(
    REQUEST_METHODS.DELETE,
    `${STORIES_URL}/${storyId}`,
    authorizationToken
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
  uploadImage
}
