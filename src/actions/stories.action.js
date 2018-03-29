import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function storiesLoaded(stories) {
  return { type: actionTypes.STORIES_LOADED, payload: stories }
}

function storyCreated(storyId, storyName) {
  return { type: actionTypes.STORY_CREATED, payload: { storyId, storyName } }
}

function storyEdited(storyId, storyName) {
  return { type: actionTypes.STORY_EDITED, payload: { storyId, storyName } }
}

function storyDeleted(storyId) {
  return { type: actionTypes.STORY_DELETED, payload: storyId }
}

export function getStories() {
  return dispatch => {
    return Api.getStories().then(story => dispatch(storiesLoaded(story)))
  }
}

export function getStoriesByPOI(poiId) {
  return dispatch => {
    return Api.getStoriesByPOI(poiId).then(storyIds =>
      dispatch(storiesLoaded(storyIds))
    )
  }
}

export function getStory(storyId) {
  return dispatch => {
    return Api.getStory(storyId).then(res => dispatch(storiesLoaded(storyId)))
  }
}

export function postStory(storyName) {
  return dispatch => {
    return Api.postStory(storyName).then(res =>
      dispatch(storyCreated(res.storyId, storyName))
    )
  }
}

export function editStory(storyId, storyName) {
  return dispatch => {
    return Api.editStory(storyId, storyName).then(
      dispatch(storyEdited(storyId, storyName))
    )
  }
}

export function deleteStory(storyId) {
  return dispatch => {
    return Api.deleteStory(storyId).then(dispatch(storyDeleted(storyId)))
  }
}
