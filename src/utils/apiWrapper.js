import request from 'superagent'
import { config } from './apiConfig'

const REQUEST_METHODS = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete'
}

function createRequest(method, endpoint, options) {
  let req = request[method](`${config.apiUrl}/${endpoint}`)
  if (options) {
    if (method === REQUEST_METHODS.get) {
      req = req.query(options)
    } else if ([REQUEST_METHODS.post, REQUEST_METHODS.put].includes(method)) {
      req = req.send(options)
    }
  }
  return req
    .then(response => response.body.data)
    .catch(err => console.error(err))
}

function convertApiPOI(poi) {
  return {
    id: poi.id,
    title: poi.name,
    // TODO: change api to date
    date: poi.data,
    description: poi.eventinfo,
    // TODO: support multiple media items
    image: poi.content[0],
    coordinateX: poi.x_coord,
    coordinateY: poi.y_coord,
    // TODO: additional_links should just be list of links
    // (no need for POI id, that's kinda redundant)
    links: poi.additional_links.map(l => l.url)
  }
}

function convertApiStory(story) {
  return {
    id: story.id,
    name: story.story_name
  }
}

// TODO: api url should be /pois
function getPOIs() {
  return createRequest(REQUEST_METHODS.get, 'poi').then(res =>
    res.map(r => r.data).map(convertApiPOI)
  )
}

function getStories() {
  return createRequest(REQUEST_METHODS.get, 'stories').then(res =>
    res.map(convertApiStory)
  )
}

// TODO: api should take in story id, not name
function getStory(name) {
  return createRequest(REQUEST_METHODS.get, `stories/${name}`)
}

export default {
  getPOIs,
  getStories,
  getStory
}
