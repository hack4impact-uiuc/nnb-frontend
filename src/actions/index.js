import { fetchStuff } from './stuff.action'
import { enableEditMode, disableEditMode } from './edit.action'
import { loadMaps, createMap, removeMap } from './maps.action'
import {
  loadStories,
  loadStoriesByPOIId,
  postStory,
  updateStory,
  deleteStory
} from './stories.action'
import {
  getPois,
  getPoiById,
  getPoisByMapYear,
  getPoisByStoryId,
  postPoi,
  putPoi,
  deletePoi
} from './pois.action'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia
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
  postStory,
  updateStory,
  deleteStory,
  getPois,
  getPoiById,
  getPoisByMapYear,
  getPoisByStoryId,
  postPoi,
  putPoi,
  deletePoi,
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia
}
