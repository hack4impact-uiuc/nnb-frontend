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

// TODO: api url should be /pois
function getPOIs() {
  return createRequest(REQUEST_METHODS.get, 'poi').then(res =>
    res.map(r => r.data)
  )
}

function getStories() {
  return createRequest(REQUEST_METHODS.get, 'stories')
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
