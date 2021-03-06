import * as actionTypes from './actionTypes'
import { Api } from './../utils'

const EMPTY_LINK = { url: '', displayName: '' }

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

function poiFormCaptionModified(captionIndex, captionValue) {
  return {
    type: actionTypes.POI_FORM_CAPTION_MODIFIED,
    payload: { captionIndex, captionValue }
  }
}

function poiCopied(poi) {
  return { type: actionTypes.POI_COPIED, payload: poi }
}

function poiPasted(poi) {
  return { type: actionTypes.POI_PASTED, payload: poi }
}

function newPOICreationStarted(mapYear, xCoord, yCoord) {
  return {
    type: actionTypes.NEW_POI_CREATION_STARTED,
    payload: { mapYear, xCoord, yCoord }
  }
}

function poiFormExited() {
  return {
    type: actionTypes.POI_FORM_EXITED
  }
}

function editPOISet(poi) {
  return {
    type: actionTypes.EDIT_POI_SET,
    payload: poi
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

export function modifyPOIFormLink(index, field, value) {
  return dispatch => dispatch(poiFormLinkModified(index, field, value))
}

export function addPOIFormMedia(dataURL) {
  return dispatch =>
    Api.uploadImage(dataURL).then(contentUrl =>
      dispatch(poiFormMediaAdded({ contentUrl }))
    )
}

export function addPOIFormYoutubeMedia(youtubeVideoId) {
  return dispatch => dispatch(poiFormMediaAdded({ contentUrl: youtubeVideoId }))
}

export function removePOIFormMedia(media) {
  return dispatch => dispatch(poiFormMediaRemoved(media))
}

export function modifyPOIFormCaption(captionIndex, captionValue) {
  return dispatch =>
    dispatch(poiFormCaptionModified(captionIndex, captionValue))
}

export function copyPOI(poi) {
  return dispatch => dispatch(poiCopied(poi))
}

export function pastePOI(poi) {
  return dispatch => dispatch(poiPasted(poi))
}

export function createNewPOI(mapYear, xCoord, yCoord) {
  return dispatch => dispatch(newPOICreationStarted(mapYear, xCoord, yCoord))
}

export function exitPOIForm() {
  return dispatch => dispatch(poiFormExited())
}

export function editPOI() {
  return (dispatch, getState) => {
    const store = getState()
    const { activePOIs, selectedPOIId } = store.pois
    const selectedPOI = activePOIs.find(poi => poi.id === selectedPOIId)
    dispatch(editPOISet(selectedPOI))
  }
}
