import { APP_LOADED } from './actionTypes'
import { enableEditMode, disableEditMode } from './edit.action'
import { loadMaps, createMap, deleteMap, setSelectedMap } from './maps.action'
import {
  loadStories,
  loadStoriesByPOIId,
  createStory,
  updateStory,
  deleteStory,
  setSelectedStory
} from './stories.action'
import {
  loadPOIs,
  loadPOIById,
  createPOI,
  updatePOI,
  deletePOI,
  setSelectedPOI,
  setPreviewedPOI,
  setNextPOIInStory,
  setPreviousPOIInStory
} from './pois.action'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  modifyPOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia,
  createNewPOI,
  addPOIFormYoutubeMedia,
  exitPOIForm,
  editPOI
} from './poiForm.action'
import {
  toggleSidebar,
  showStoryForm,
  hideStoryForm,
  setEditingStoryId,
  updateStoryNameInput
} from './sidebar.action'
import { login, logout } from './auth.action'

function appLoaded() {
  return { type: APP_LOADED }
}

export {
  appLoaded,
  enableEditMode,
  disableEditMode,
  loadMaps,
  createMap,
  deleteMap,
  setSelectedMap,
  loadStories,
  loadStoriesByPOIId,
  createStory,
  updateStory,
  deleteStory,
  setSelectedStory,
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  modifyPOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia,
  createNewPOI,
  addPOIFormYoutubeMedia,
  exitPOIForm,
  editPOI,
  loadPOIs,
  loadPOIById,
  createPOI,
  updatePOI,
  deletePOI,
  setSelectedPOI,
  setPreviewedPOI,
  setNextPOIInStory,
  setPreviousPOIInStory,
  toggleSidebar,
  showStoryForm,
  hideStoryForm,
  setEditingStoryId,
  updateStoryNameInput,
  login,
  logout
}
