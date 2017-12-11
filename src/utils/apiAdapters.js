/**
 * convert to api
 */
function convertToApiMap(map) {
  return {
    image_url: map.imageUrl,
    year: map.year
  }
}

function convertToApiPOI(poi) {
  return {
    name: poi.title,
    map_by_year: poi.mapByYear,
    year: poi.date.format('YYYY'),
    month: poi.date.format('MM'),
    day: poi.date.format('DD'),
    info: poi.description,
    x_coor: poi.coordinateX,
    y_coor: poi.coordinateY,
    additional_links: poi.links.map(link => ({
      url: link.url,
      url_name: link.urlName
    })),
    content: poi.content.map(content => ({
      content_url: content.contentUrl,
      caption: content.caption
    }))
  }
}

function convertToApiStory(storyName) {
  return {
    story_name: storyName
  }
}

/**
 * convert from api
 */
function convertFromApiMap(map) {
  return {
    imageUrl: map.image_url,
    year: map.year,
    id: map.id
  }
}

function convertFromApiPOI(poi) {
  return {
    id: poi.id,
    title: poi.name,
    // TODO: change api to date
    date: poi.data,
    description: poi.event_info,
    coordinateX: poi.x_coord,
    coordinateY: poi.y_coord,
    // TODO: additional_links should just be list of links
    // (no need for POI id, that's kinda redundant)
    links: (poi.additional_links || []).map(l => l.url),
    content: poi.content.map(image => ({
      contentUrl: image.content_url,
      caption: image.caption
    }))
  }
}

function convertFromApiStory(story) {
  return {
    id: story.id,
    name: story.story_name
  }
}

export default {
  convertToApiMap,
  convertToApiPOI,
  convertToApiStory,
  convertFromApiMap,
  convertFromApiPOI,
  convertFromApiStory
}
