import moment from 'moment'
import Api from './apiWrapper'
import storage from './webStorage'

function validateLink(link) {
  let validatedLink = link
  if (!(link.startsWith('http://') || link.startsWith('https://'))) {
    validatedLink = `http://${link}`
  }
  return validatedLink
}

// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
function parseYoutubeUrl(url) {
  if (!url) return false
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

// this doesn't work for _all_ years, but probably does for the range we're interested in
// see https://github.com/hack4impact-uiuc/nnb-frontend/issues/121
function compareYear(poi1, poi2) {
  return moment.utc(moment(poi1.date)).diff(moment.utc(moment(poi2.date)))
}

const utils = {
  validateLink,
  parseYoutubeUrl,
  compareYear
}

export { Api, storage, utils }
