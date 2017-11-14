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
      req = req.params(options)
    }
  }
  return req.then(response => response.body)
}

function getData() {
  const endpoint = 'posts/1'
  return createRequest(REQUEST_METHODS.get, endpoint)
}

export default {
  getData
}
