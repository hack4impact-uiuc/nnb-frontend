import moment from 'moment'
import { pois, stories, maps } from './dummyData'
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

function compareYear(a, b) {
  return moment(a.date).isAfter(moment(b.date))
}

const utils = {
  validateLink,
  parseYoutubeUrl,
  compareYear
}

export { pois, stories, maps, Api, storage, utils }
