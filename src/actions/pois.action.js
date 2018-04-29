import * as actionTypes from './actionTypes'
import { utils, Api } from './../utils'

function poisLoaded(pois) {
  return { type: actionTypes.POIS_LOADED, payload: pois }
}

function poiCreated(poi) {
  return { type: actionTypes.POI_CREATED, payload: poi }
}

function poiUpdated(poi) {
  return { type: actionTypes.POI_UPDATED, payload: poi }
}

function poiDeleted(poiId) {
  return { type: actionTypes.POI_DELETED, payload: { id: poiId } }
}

function poiSelected(poi) {
  return { type: actionTypes.POI_SELECTED, payload: poi }
}

function poiPreviewing(poi) {
  return { type: actionTypes.POI_PREVIEWED, payload: poi }
}

function nextPOIInStorySet() {
  return { type: actionTypes.NEXT_POI_IN_STORY_SET }
}

function previousPOIInStorySet() {
  return { type: actionTypes.PREVIOUS_POI_IN_STORY_SET }
}

function poisCarouselIndexModified(carouselIndex) {
  return {
    type: actionTypes.POIS_CAROUSEL_INDEX_MODIFIED,
    payload: carouselIndex
  }
}

export function loadPOIs() {
  return (dispatch, getState) => {
    const store = getState()
    const { selectedStoryId } = store.stories
    const { selectedMapId, maps } = store.timeline
    if (!!selectedStoryId) {
      return Api.loadPOIs({ storyId: selectedStoryId }).then(pois => {
        pois.sort(utils.compareYear)
        dispatch(poisLoaded(pois))
        if (pois.length) {
          return dispatch(poiSelected(pois[0]))
        }
      })
    }
    const mapYear = maps.find(map => map.id === selectedMapId).year
    return Api.loadPOIs({ mapYear }).then(pois => dispatch(poisLoaded(pois)))
  }
}

export function loadPOIById(poiId) {
  return dispatch => {
    // TODO: this will set the activePOIs to just this poi
    //       is that what we want to do?
    //       or should we push to activePOIs and set this as the selectedPOI?
    //       in which case we would need a different action type
    return Api.loadPOI(poiId).then(poi => dispatch(poisLoaded([poi])))
  }
}

export function createPOI(poi) {
  return dispatch => {
    return Api.createPOI(poi).then(poi => dispatch(poiCreated(poi)))
  }
}

export function updatePOI(poiId, poi) {
  return dispatch => {
    return Api.updatePOI(poiId, poi).then(poi => dispatch(poiUpdated(poi)))
  }
}

export function deletePOI(poiId) {
  return dispatch => {
    return Api.deletePOI(poiId).then(() => dispatch(poiDeleted(poiId)))
  }
}

export function setSelectedPOI(poi) {
  return dispatch => dispatch(poiSelected(poi))
}

export function setPreviewingPOI(poi) {
  return dispatch => dispatch(poiPreviewing(poi))
}

export function setPreviousPOIInStory() {
  return (dispatch, getState) => {
    dispatch(previousPOIInStorySet())

    // this may seem redundant in the context of the pois reducer,
    // but it's called here to be picked up my the maps/timeline reducer
    // so that it sets the correct map year based on the previous poi in the story
    const store = getState()
    const { activePOIs, selectedPOIId } = store.pois
    const selectedPOI = activePOIs.find(poi => poi.id === selectedPOIId)
    dispatch(poiSelected(selectedPOI))
  }
}

export function setNextPOIInStory() {
  return (dispatch, getState) => {
    dispatch(nextPOIInStorySet())

    // this may seem redundant in the context of the pois reducer,
    // but it's called here to be picked up my the maps/timeline reducer
    // so that it sets the correct map year based on the next poi in the story
    const store = getState()
    const { activePOIs, selectedPOIId } = store.pois
    const selectedPOI = activePOIs.find(poi => poi.id === selectedPOIId)
    dispatch(poiSelected(selectedPOI))
  }
}

export function modifyPoisCarouselIndex(carouselIndex) {
  return dispatch => dispatch(poisCarouselIndexModified(carouselIndex))
}
