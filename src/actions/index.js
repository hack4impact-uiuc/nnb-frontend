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
  deletePOI
} from './pois.action'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  modifyPOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia
} from './poiForm.action'
import { updateUniSearchInput, uniSearchPOIs } from './search.action'

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
  updateUniSearchInput,
  uniSearchPOIs
}
