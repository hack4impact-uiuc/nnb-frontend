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
    map_year: poi.mapYear,
    date: `${poi.date.format('YYYY')}-${poi.date.format(
      'MM'
    )}-${poi.date.format('DD')}`,
    description: poi.description,
    x_coord: poi.xCoord,
    y_coord: poi.yCoord,
    links: poi.links.filter(link => !!link.url).map(link => ({
      link_url: link.url,
      display_name: link.displayName
    })),
    media: poi.media.map(media => ({
      content_url: media.contentUrl,
      caption: media.caption
    })),
    story_ids: poi.storyIds // not sure on how to do this one
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

/**
 * Convert from api
 */

function convertFromApiPOI(poi) {
  return {
    id: poi._id,
    name: poi.name,
    date: poi.date,
    description: poi.description,
    xCoord: poi.x_coord,
    yCoord: poi.y_coord,
    mapYear: poi.map_year,
    links: poi.links.map(link => ({
      url: link.link_url,
      displayName: link.display_name
    })),
    media: poi.media.map(media => ({
      contentUrl: media.content_url,
      caption: media.caption
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
  convertFromApiPOI,
  convertFromApiMap,
  convertFromApiStory
}
