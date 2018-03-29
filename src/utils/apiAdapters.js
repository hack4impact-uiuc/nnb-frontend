/**
 * convert to api
 */
function convertToApiMap(map) {
  return {
    image_url: map.imageUrl,
    map_year: map.year
  }
}

function convertToApiPOI(poi) {
  return {
    name: poi.name,
    map_year: poi.mapByYear,
    date: `${poi.date.format('YYYY')} - ${poi.date.format(
      'MM'
    )} - ${poi.date.format('DD')}`,
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
    story_ids: poi.storyIds // not sure on how to do this one
  }
}

function convertToApiStory(storyName) {
  return {
    story_name: storyName
    // poi_ids: array of poi ids
  }
}

function convertToApiStoriesMultiple(poi, selectedStories) {
  // what is this for
  return {
    input_story_name_id: selectedStories,
    input_poi_id: poi.id
  }
}

function convertToApiEditStoriesMultiple(poiId, selectedStories) {
  // what is this for
  return {
    poi_id: poiId,
    stories: selectedStories
  }
}

/**
 * convert from api
 */
function convertFromApiMap(map) {
  return {
    imageUrl: map.image_url,
    year: map.map_year,
    id: map._id
  }
}

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

function convertFromApiStory(story) {
  return {
    id: story._id,
    name: story.story_name
  }
}

export default {
  convertToApiMap,
  convertToApiPOI,
  convertToApiStory,
  convertToApiStoriesMultiple,
  convertToApiEditStoriesMultiple,
  convertFromApiMap,
  convertFromApiPOI,
  convertFromApiStory
}
