import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function storiesLoaded(stories) {
  return { type: actionTypes.STORIES_LOADED, payload: stories }
}

function storyCreated(story) {
  return {
    type: actionTypes.STORY_CREATED,
    payload: story
  }
}

function storyUpdated(story) {
  return {
    type: actionTypes.STORY_UPDATED,
    payload: story
  }
}

function storyDeleted(storyId) {
  return { type: actionTypes.STORY_DELETED, payload: { id: storyId } }
}

export function loadStories() {
  return dispatch => {
    return Api.loadStories().then(stories => dispatch(storiesLoaded(stories)))
  }
}

export function loadStoriesByPOIId(poiId) {
  return dispatch => {
    return Api.loadStories({ poiId }).then(stories =>
      dispatch(storiesLoaded(stories))
    )
  }
}

export function createStory(story) {
  return dispatch => {
    return Api.createStory(story).then(story => dispatch(storyCreated(story)))
  }
}

export function updateStory(storyId, story) {
  return dispatch => {
    return Api.updateStory(storyId, story).then(story =>
      dispatch(storyUpdated(story))
    )
  }
}

export function deleteStory(storyId) {
  return dispatch => {
    return Api.deleteStory(storyId).then(() => dispatch(storyDeleted(storyId)))
  }
}
