import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function storiesLoaded(stories) {
  return { type: actionTypes.STORIES_LOADED, payload: stories }
}

function storyCreated(storyId, storyName) {
  return {
    type: actionTypes.STORY_CREATED,
    payload: { id: storyId, name: storyName }
  }
}

function storyEdited(storyId, storyName) {
  return {
    type: actionTypes.STORY_EDITED,
    payload: { id: storyId, name: storyName }
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
    return Api.loadStoriesByPOIId(poiId).then(storyIds =>
      dispatch(storiesLoaded(storyIds))
    )
    // TODO: send an array of stories to storiesLoaded? depends on v2 endpoints
  }
}

export function postStory(storyName) {
  return dispatch => {
    return Api.postStory(storyName).then(res =>
      dispatch(storyCreated(res.id, storyName))
    )
  }
}

export function updateStory(storyId, storyName) {
  return dispatch => {
    return Api.updateStory(storyId, storyName).then(
      dispatch(storyEdited(storyId, storyName))
    )
  }
}

export function deleteStory(storyId) {
  return dispatch => {
    return Api.deleteStory(storyId).then(dispatch(storyDeleted(storyId)))
  }
}
