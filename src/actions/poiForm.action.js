import * as actionTypes from './actionTypes'

const EMPTY_LINK = { url: '', urlName: '' }

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

function poiFormLinkAdded() {
  return {
    type: actionTypes.POI_FORM_LINK_ADDED,
    payload: EMPTY_LINK
  }
}

function poiFormLinkRemoved(index) {
  return {
    type: actionTypes.POI_FORM_LINK_REMOVED,
    payload: { index }
  }
}

function poiFormLinkModified(index, field, value) {
  return {
    type: actionTypes.POI_FORM_LINK_MODIFIED,
    payload: { index, field, value }
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

function poiCopied(poi) {
  return { type: actionTypes.POI_COPIED, payload: poi }
}

function poiFormPOIPasted(poi) {
  return { type: actionTypes.POI_FORM_POI_PASTED, payload: poi }
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

export function modifyPOIFormLink(index, field, value) {
  return dispatch => dispatch(poiFormLinkModified(index, field, value))
}

export function addPOIFormMedia(media) {
  return dispatch => dispatch(poiFormMediaAdded(media))
}

export function removePOIFormMedia(media) {
  return dispatch => dispatch(poiFormMediaRemoved(media))
}

export function copyPOI(poi) {
  return dispatch => dispatch(poiCopied(poi))
}

export function pastePOIFormPOI(poi) {
  return dispatch => dispatch(poiFormPOIPasted(poi))
}