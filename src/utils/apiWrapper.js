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
  return req.then(response => response.body).catch(err => console.error(err))
}

function convertFromApiPOI(poi) {
  return {
    id: poi.id,
    title: poi.name,
    // TODO: change api to date
    date: poi.data,
    description: poi.event_info,
    // TODO: support multiple media items
    image: poi.content && poi.content.length ? poi.content[0] : '',
    coordinateX: poi.x_coord,
    coordinateY: poi.y_coord,
    // TODO: additional_links should just be list of links
    // (no need for POI id, that's kinda redundant)
    links: (poi.additional_links || []).map(l => l.url)
  }
}

function convertToApiPOI(poi) {
  return {
    name: poi.title,
    year: poi.date.format('YYYY'),
    month: poi.date.format('MM'),
    day: poi.date.format('DD'),
    info: poi.description,
    x_coor: poi.coordinateX,
    y_coor: poi.coordinateY,
    additional_links: poi.links.map(link => ({ url: link })),
    content: [
      {
        content_url: 'url',
        caption: 'caption'
      },
      {
        content_url: 'url2',
        caption: 'caption2'
      }
    ]
  }
}

function convertFromApiStory(story) {
  return {
    id: story.id,
    name: story.story_name
  }
}

function convertToApiStory(storyName) {
  return {
    story_name: storyName
  }
}

function convertFromApiMap(map) {
  return {
    imageUrl: map.image_url,
    year: map.year
  }
}

function convertToApiMap(map) {
  return {
    image_url: map.imageUrl,
    year: map.year
  }
}

// TODO: api url should be /pois
function getPOIs() {
  return createRequest(REQUEST_METHODS.get, 'poi')
    .then(res => res.data)
    .then(res => res.map(r => r.data).map(convertFromApiPOI))
}

function getStories() {
  return createRequest(REQUEST_METHODS.get, 'stories')
    .then(res => res.data)
    .then(res => res.map(convertFromApiStory))
}

// TODO: api should take in story id, not name
function getStory(name) {
  return createRequest(REQUEST_METHODS.get, `stories/${name}`).then(
    res => res.data
  )
}

function getMaps() {
  return createRequest(REQUEST_METHODS.get, 'maps')
    .then(res => res.data)
    .then(res => res.map(convertFromApiMap))
}

function postPOI(poi) {
  return createRequest(REQUEST_METHODS.post, 'poi', convertToApiPOI(poi)).then(
    res => res.data
  )
}

function postStory(storyName) {
  return createRequest(
    REQUEST_METHODS.post,
    'stories',
    convertToApiStory(storyName)
  ).then(res => res.data)
}

function postMap(map) {
  return createRequest(REQUEST_METHODS.post, 'maps', convertToApiMap(map)).then(
    res => res.data
  )
}

function getPOIsByStory(storyId) {
  return createRequest(REQUEST_METHODS.get, `stories/${storyId}`).then(res =>
    res.pois.map(convertFromApiPOI)
  )
}

export default {
  getPOIs,
  getStories,
  getStory,
  getMaps,
  postPOI,
  postStory,
  postMap,
  getPOIsByStory
}
