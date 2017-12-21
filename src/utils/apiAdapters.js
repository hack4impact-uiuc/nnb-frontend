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
    additional_links: poi.links.filter(link => !!link.url).map(link => ({
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

function convertToApiStoriesMultiple(poi, selectedStories) {
  return {
    input_story_name_id: selectedStories,
    input_poi_id: poi.id
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
    date: poi.date,
    description: poi.event_info,
    coordinateX: poi.x_coord,
    coordinateY: poi.y_coord,
    mapByYear: poi.map_by_year,
    links: poi.additional_links.map(link => ({
      url: link.url,
      urlName: link.url_name
    })),
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
  convertToApiStoriesMultiple,
  convertFromApiMap,
  convertFromApiPOI,
  convertFromApiStory
}
