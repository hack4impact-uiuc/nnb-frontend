import { APP_LOADED } from './actionTypes'
import { fetchStuff } from './stuff.action'
import { enableEditMode, disableEditMode } from './edit.action'
import { loadMaps, createMap, removeMap, setSelectedMap } from './maps.action'
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
  exitPOIForm
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
  fetchStuff,
  enableEditMode,
  disableEditMode,
  loadMaps,
  createMap,
  removeMap,
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
  loadPOIs,
  loadPOIById,
  createPOI,
  updatePOI,
  deletePOI,
  setSelectedPOI,
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
