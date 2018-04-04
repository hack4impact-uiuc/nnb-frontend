import * as actionTypes from './actionTypes'

function poiFormInputChanged(field, value) {
  return {
    type: actionTypes.POI_FORM_INPUT_CHANGED,
    payload: { field, value }
  }
}

function poiFormStoryIdToggled(storyId) {
  return {
    type: actionTypes.POI_FORM_STORY_ID_TOGGLED,
    payload: storyId
  }
}

function poiFormLinkAdded(link) {
  return {
    type: actionTypes.POI_FORM_LINK_ADDED,
    payload: link
  }
}

function poiFormLinkRemoved(link) {
  return {
    type: actionTypes.POI_FORM_LINK_REMOVED,
    payload: link
  }
}

function poiFormMediaAdded(link) {
  return {
    type: actionTypes.POI_FORM_MEDIA_ADDED,
    payload: link
  }
}

function poiFormMediaRemoved(link) {
  return {
    type: actionTypes.POI_FORM_MEDIA_REMOVED,
    payload: link
  }
}

export function updatePOIFormInput(field, value) {
  return dispatch => dispatch(poiFormInputChanged(field, value))
}

export function togglePOIFormStoryId(storyId) {
  return dispatch => dispatch(poiFormStoryIdToggled(storyId))
}

export function addPOIFormLink(link) {
  return dispatch => dispatch(poiFormLinkAdded(link))
}

export function removePOIFormLink(link) {
  return dispatch => dispatch(poiFormLinkRemoved(link))
}

export function addPOIFormMedia(media) {
  return dispatch => dispatch(poiFormMediaAdded(media))
}

export function removePOIFormMedia(media) {
  return dispatch => dispatch(poiFormMediaRemoved(media))
}
