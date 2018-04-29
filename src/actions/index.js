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
  setPreviewingPOI,
  setNextPOIInStory,
  setPreviousPOIInStory,
  modifyPoisCarouselIndex
} from './pois.action'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  modifyPOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia,
  modifyPOIFormCaption,
  modifyPOIFormCarouselIndex,
  createNewPOI,
  addPOIFormYoutubeMedia,
  copyPOI,
  pastePOI,
  exitPOIForm,
  editPOI
} from './poiForm.action'
import {
  toggleSidebar,
  showStoryForm,
  hideStoryForm,
  setEditingStoryId,
  updateStoryNameInput,
  updateSelectedPois,
  loadEditingPois,
  showStoryModal,
  exitStoryModal
} from './sidebar.action'
import {
  updateUniversalSearchInput,
  searchUniversalPOIs,
  updateStorySearchInput,
  searchStoryPOIs
} from './search.action'
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
  modifyPOIFormCaption,
  modifyPOIFormCarouselIndex,
  createNewPOI,
  addPOIFormYoutubeMedia,
  exitPOIForm,
  editPOI,
  loadPOIs,
  loadPOIById,
  createPOI,
  updatePOI,
  deletePOI,
  copyPOI,
  pastePOI,
  setSelectedPOI,
  setPreviewingPOI,
  setNextPOIInStory,
  setPreviousPOIInStory,
  modifyPoisCarouselIndex,
  toggleSidebar,
  showStoryForm,
  hideStoryForm,
  setEditingStoryId,
  updateStoryNameInput,
  updateUniversalSearchInput,
  searchUniversalPOIs,
  updateStorySearchInput,
  searchStoryPOIs,
  updateSelectedPois,
  loadEditingPois,
  showStoryModal,
  exitStoryModal,
  login,
  logout
}
