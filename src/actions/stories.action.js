import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'
import { toastNotify } from './..'

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

function storySelected(storyId) {
  return { type: actionTypes.STORY_SELECTED, payload: storyId }
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
    return Api.createStory(story).then(story => {
      toastNotify('Story created', { type: 'success' })
      return dispatch(storyCreated(story))
    })
  }
}

export function updateStory(storyId, story) {
  return dispatch => {
    return Api.updateStory(storyId, story).then(story => {
      toastNotify('Story updated', { type: 'success' })
      return dispatch(storyUpdated(story))
    })
  }
}

export function deleteStory(storyId) {
  return dispatch => {
    return Api.deleteStory(storyId).then(() => {
      toastNotify('Story deleted', { type: 'success' })
      return dispatch(storyDeleted(storyId))
    })
  }
}

export function setSelectedStory(storyId) {
  return dispatch => dispatch(storySelected(storyId))
}
