import { fetchStuff } from './stuff.action'
import { enableEditMode, disableEditMode } from './edit.action'
import { loadMaps, createMap, removeMap } from './maps.action'
import {
  loadStories,
  loadStoriesByPOIId,
  createStory,
  updateStory,
  deleteStory
} from './stories.action'
import {
  loadPOIs,
  loadPOIById,
  loadPOIsByMapYear,
  loadPOIsByStoryId,
  createPOI,
  updatePOI,
  deletePOI,
  copyPOI,
  pastePOI
} from './pois.action'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  modifyPOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia,
  copyPOI,
  pastePOIFormPOI
} from './poiForm.action'

export {
  fetchStuff,
  enableEditMode,
  disableEditMode,
  loadMaps,
  createMap,
  removeMap,
  loadStories,
  loadStoriesByPOIId,
  createStory,
  updateStory,
  deleteStory,
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  modifyPOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia,
  loadPOIs,
  loadPOIById,
  loadPOIsByMapYear,
  loadPOIsByStoryId,
  createPOI,
  updatePOI,
  deletePOI,
  copyPOI,
  pastePOIFormPOI
}
