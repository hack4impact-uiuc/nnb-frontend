import * as actionTypes from './actionTypes'

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
