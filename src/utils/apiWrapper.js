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
 * New POIs
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
 * New Maps
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
 * New Stories
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

// end new

// /**
//  * Map
//  */
// function getMaps() {
//   return createRequest(REQUEST_METHODS.GET, MAPS_URL)
//     .then(res => res.result.maps)
//     .then(res => res.map(adapters.convertFromApiMap))
// }

// function postMap(map) {
//   return createRequest(
//     REQUEST_METHODS.POST,
//     MAPS_URL,
//     adapters.convertToApiMap(map)
//   ).then(res => res.data)
// }

// function deleteMap(mapId) {
//   return createRequest(REQUEST_METHODS.DELETE, `${MAPS_URL}/${mapId}`).then(
//     res => res.data
//   )
// }

// /**
//  * POI
//  */
// function getPOIs() {
//   return createRequest(REQUEST_METHODS.GET, POIS_URL).then(res =>
//     res.data.map(adapters.convertFromApiPOI)
//   )
// }

// function getPOI(id) {
//   return createRequest(REQUEST_METHODS.GET, `${POIS_URL}/${id}`)
//     .then(res => res.data)
//     .then(res => res.map(adapters.convertFromApiPOI)[0])
// }

// function getPOIsByYear(year) {
//   return createRequest(REQUEST_METHODS.GET, `${MAPS_URL}/years/${year}`).then(res => {
//     const pois = res.data.pois.map(adapters.convertFromApiPOI)
//     const map = adapters.convertFromApiMap(res.data.map[0])
//     return { map, pois }
//   })
// }

// function getPOIsByStory(storyId) {
//   return createRequest(REQUEST_METHODS.GET, `${STORIES_URL}/${storyId}`).then(res =>
//     res.pois.map(adapters.convertFromApiPOI)
//   )
// }

// function postPOIToStories(poi, selectedStories) {
//   return createRequest(
//     REQUEST_METHODS.POST,
//     'stories/add/multiple',
//     adapters.convertToApiStoriesMultiple(poi, selectedStories)
//   )
// }

// function editPOIStories(poiId, selectedStories) {
//   return createRequest(
//     REQUEST_METHODS.POST,
//     'stories/edit/multiple',
//     adapters.convertToApiEditStoriesMultiple(poiId, selectedStories)
//   )
// }

// function postPOI(poi) {
//   return createRequest(
//     REQUEST_METHODS.POST,
//     POIS_URL,
//     adapters.convertToApiPOI(poi)
//   ).then(res => res.data)
// }

// function editPOI(poiId, poi) {
//   return createRequest(
//     REQUEST_METHODS.PUT,
//     `${POIS_URL}/${poiId}`,
//     adapters.convertToApiPOI(poi)
//   )
// }

// function deletePOI(poiId) {
//   return createRequest(REQUEST_METHODS.DELETE, `${POIS_URL}/${poiId}`).then(
//     res => res.data
//   )
// }

// /**
//  * Story
//  */
// function getStories() {
//   return createRequest(REQUEST_METHODS.GET, STORIES_URL)
//     .then(res => res.data)
//     .then(res => res.map(adapters.convertFromApiStory))
// }

// function getStoriesByPOI(poiId) {
//   return createRequest(REQUEST_METHODS.GET, `getstories/${poiId}`).then(
//     res => res.story_ids
//   )
// }

// // TODO: api should take in story id, not name
// function getStory(name) {
//   return createRequest(REQUEST_METHODS.GET, `${STORIES_URL}/${name}`).then(
//     res => res.data
//   )
// }

// function postStory(storyName) {
//   return createRequest(
//     REQUEST_METHODS.POST,
//     'stories',
//     adapters.convertToApiStory(storyName)
//   ).then(res => res.data)
// }

// function editStory(storyId, storyName) {
//   return createRequest(
//     REQUEST_METHODS.PUT,
//     `stories/${storyId}`,
//     adapters.convertToApiStory(storyName)
//   ).then(res => res.data)
// }

// function deleteStory(storyId) {
//   return createRequest(REQUEST_METHODS.DELETE, `${STORIES_URL}/${storyId}`).then(
//     res => res.data
//   )
// }

// /**
//  * Auth
//  */
// function postLogin(loginInfo) {
//   return createRequest(REQUEST_METHODS.POST, 'login', loginInfo)
// }

// /**
//  * Cloudinary
//  */
// function uploadImage(imageDataURL) {
//   return cloudinary.uploader
//     .upload(imageDataURL)
//     .then(res => res.secure_url)
//     .catch(err => console.error(err))
// }

// export default {
//   getMaps,
//   postMap,
//   deleteMap,
//   getPOIs,
//   getPOI,
//   getPOIsByYear,
//   getPOIsByStory,
//   postPOIToStories,
//   editPOIStories,
//   postPOI,
//   editPOI,
//   deletePOI,
//   getStories,
//   getStoriesByPOI,
//   getStory,
//   postStory,
//   postLogin,
//   editStory,
//   deleteStory,
//   uploadImage
// }
