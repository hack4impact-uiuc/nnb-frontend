/**
 * Convert to api
 */

function convertToApiGetPOI(params) {
  return {
    map_year: params.mapYear,
    story_id: params.storyId
  }
}

function convertToApiPOI(poi) {
  return {
    name: poi.name,
    map_year: poi.mapByYear,
    date: `${poi.date.format('YYYY')}-${poi.date.format(
      'MM'
    )}-${poi.date.format('DD')}`,
    description: poi.description,
    x_coord: poi.coordinateX,
    y_coord: poi.coordinateY,
    links: poi.links.filter(link => !!link.url).map(link => ({
      link_url: link.url,
      display_name: link.urlName
    })),
    media: poi.content.map(content => ({
      content_url: content.contentUrl,
      caption: content.caption
    })),
    story_ids: poi.stories // not sure on how to do this one
  }
}

function convertToApiMap(map) {
  return {
    image_url: map.imageUrl,
    map_year: map.year
  }
}

function convertToApiGetStories(params) {
  return {
    poi_id: params.poiId
  }
}

function convertToApiStory(story) {
  return {
    story_name: story.name,
    poi_ids: story.poiIds
  }
}

function convertToApiSearchPois(params) {
  return {
    q: params.query,
    name: params.name,
    description: params.description
  }
}

/**
 * Convert from api
 */

function convertFromApiPOI(poi) {
  return {
    id: poi._id,
    name: poi.name,
    date: poi.date,
    description: poi.description,
    coordinateX: poi.x_coord,
    coordinateY: poi.y_coord,
    mapByYear: poi.map_year,
    links: poi.links.map(link => ({
      url: link.link_url,
      urlName: link.display_name
    })),
    content: poi.media.map(content => ({
      contentUrl: content.content_url,
      caption: content.caption
    })),
    stories: poi.stories.map(convertFromApiStory)
  }
}

function convertFromApiMap(map) {
  return {
    id: map._id,
    imageUrl: map.image_url,
    year: map.map_year
  }
}

function convertFromApiStory(story) {
  return {
    id: story._id,
    name: story.story_name
  }
}

export default {
  convertToApiGetPOI,
  convertToApiPOI,
  convertToApiMap,
  convertToApiGetStories,
  convertToApiStory,
  convertToApiSearchPois,
  convertFromApiPOI,
  convertFromApiMap,
  convertFromApiStory
}
