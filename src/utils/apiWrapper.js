import request from 'superagent'
import { config } from './apiConfig'

function getData() {
  return request.get(`${config.apiUrl}/posts/1`).then(response => response.body)
}

export default {
  getData
}
