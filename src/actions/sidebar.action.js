import * as actionTypes from './actionTypes'
import Api from './../utils/apiWrapper'

function sidebarToggled() {
  return { type: actionTypes.SIDEBAR_TOGGLED }
}

function storyFormSetShow() {
  return { type: actionTypes.STORY_FORM_SET_SHOW }
}

function storyFormSetHide() {
  return { type: actionTypes.STORY_FORM_SET_HIDE }
}

function editingStoryIdSet(storyId) {
  return { type: actionTypes.EDITING_STORY_ID_SET, payload: storyId }
}

function storyNameInputUpdated(storyName) {
  return { type: actionTypes.STORY_NAME_INPUT_UPDATED, payload: storyName }
}

function selectedPoisUpdated(pois) {
  return { type: actionTypes.SELECTED_POIS_UPDATED, payload: pois }
}

function editingPoisLoaded(pois) {
  return { type: actionTypes.EDITING_POIS_LOADED, payload: pois }
}

function storyModalOpened() {
  return { type: actionTypes.STORY_MODAL_OPENED }
}

function storyModalExited() {
  return { type: actionTypes.STORY_MODAL_EXITED }
}

export function toggleSidebar() {
  return dispatch => dispatch(sidebarToggled())
}

export function showStoryForm() {
  return dispatch => dispatch(storyFormSetShow())
}

export function hideStoryForm() {
  return dispatch => dispatch(storyFormSetHide())
}

export function setEditingStoryId(storyId) {
  return dispatch => dispatch(editingStoryIdSet(storyId))
}

export function updateStoryNameInput(storyName) {
  return dispatch => dispatch(storyNameInputUpdated(storyName))
}

export function updateSelectedPois(pois) {
  return dispatch => dispatch(selectedPoisUpdated(pois))
}

export function loadEditingPois() {
  return (dispatch, getState) => {
    const store = getState()
    const { editingStoryId } = store.sidebar
    return Api.loadPOIs({ storyId: editingStoryId }).then(pois =>
      dispatch(editingPoisLoaded(pois))
    )
  }
}

export function showStoryModal() {
  return dispatch => dispatch(storyModalOpened())
}

export function exitStoryModal() {
  return dispatch => dispatch(storyModalExited())
}
