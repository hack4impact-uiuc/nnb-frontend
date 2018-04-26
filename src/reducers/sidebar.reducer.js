import initialState from './initialState'
import {
  SIDEBAR_TOGGLED,
  STORY_FORM_SET_SHOW,
  STORY_FORM_SET_HIDE,
  EDITING_STORY_ID_SET,
  STORY_NAME_INPUT_UPDATED,
  POIS_INPUT_UPDATED,
  EDITING_POIS_LOADED,
  SHOW_STORY_MODAL,
  EXIT_STORY_MODAL,
  EDIT_MODE_DISABLED
} from '../actions/actionTypes'

export default function sidebar(state = initialState.sidebar, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLED:
      return {
        ...state,
        shouldShowSidebar: !state.shouldShowSidebar
      }
    case STORY_FORM_SET_SHOW:
      return {
        ...state,
        shouldShowStoryForm: true
      }
    case STORY_FORM_SET_HIDE:
      return {
        ...state,
        shouldShowStoryForm: false
      }
    case EDITING_STORY_ID_SET:
      return {
        ...state,
        editingStoryId: action.payload
      }
    case STORY_NAME_INPUT_UPDATED:
      return {
        ...state,
        inputStoryName: action.payload
      }
    case POIS_INPUT_UPDATED:
      return {
        ...state,
        inputPois: action.payload
      }
    case EDITING_POIS_LOADED:
      return {
        ...state,
        inputPois: action.payload
      }
    case SHOW_STORY_MODAL:
      return {
        ...state,
        shouldShowModal: true
      }
    case EXIT_STORY_MODAL:
      return {
        ...state,
        shouldShowModal: false
      }
    case EDIT_MODE_DISABLED:
      return {
        ...state,
        editingStoryId: null,
        shouldShowModal: false,
        shouldShowStoryForm: false
      }
    default:
      return state
  }
}
