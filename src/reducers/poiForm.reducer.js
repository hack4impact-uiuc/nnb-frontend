import moment from 'moment'
import initialState from './initialState'
import {
  POI_FORM_INPUT_CHANGED,
  POI_FORM_STORY_ID_TOGGLED,
  POI_FORM_LINK_ADDED,
  POI_FORM_LINK_REMOVED,
  POI_FORM_LINK_MODIFIED,
  POI_FORM_MEDIA_ADDED,
  POI_FORM_MEDIA_REMOVED,
  POI_FORM_CAPTION_MODIFIED,
  POI_FORM_CAROUSEL_INDEX_MODIFIED,
  NEW_POI_CREATION_STARTED,
  POI_FORM_EXITED,
  EDIT_POI_SET
} from '../actions/actionTypes'

export default function poiForm(state = initialState.poiForm, action) {
  switch (action.type) {
    case POI_FORM_INPUT_CHANGED:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    case POI_FORM_STORY_ID_TOGGLED:
      return {
        ...state,
        storyIds: state.storyIds.includes(action.payload)
          ? [...state.storyIds].filter(storyId => storyId !== action.payload)
          : [...state.storyIds, action.payload]
      }
    case POI_FORM_LINK_ADDED:
      return {
        ...state,
        links: [...state.links, { ...action.payload }]
      }
    case POI_FORM_LINK_REMOVED:
      return {
        ...state,
        links: [
          ...state.links.slice(0, action.payload.index),
          ...state.links.slice(action.payload.index + 1)
        ]
      }
    case POI_FORM_LINK_MODIFIED:
      const { index, field, value } = action.payload

      // deep copy each link object.
      // otherwise editing a poi's link updates the link
      // on the activePOIs in addition to the one on poiForm.
      // that causes a bug when you edit a poi, change a link, and cancel -
      // the link changes to what was just typed
      // even though it shouldn't have been changed at all
      const newLinks = [...state.links.map(l => ({ ...l }))]
      newLinks[index][field] = value
      return {
        ...state,
        links: newLinks
      }
    case POI_FORM_MEDIA_ADDED:
      return {
        ...state,
        media: [...state.media, action.payload]
      }
    case POI_FORM_MEDIA_REMOVED:
      return {
        ...state,
        media: [...state.media].filter(
          media => media.contentUrl !== action.payload.contentUrl
        )
      }
    case POI_FORM_CAPTION_MODIFIED:
      const { captionIndex, captionValue } = action.payload

      // deep copy each media object.
      // otherwise editing a poi's captions updates the caption
      // on the activePOIs in addition to the one on poiForm.
      // that causes a bug when you edit a poi, change a caption, and cancel -
      // the caption changes to what was just typed
      // even though it shouldn't have been changed at all
      const newMedia = [...state.media.map(c => ({ ...c }))]
      newMedia[captionIndex].caption = captionValue
      return {
        ...state,
        media: newMedia
      }
    case NEW_POI_CREATION_STARTED:
      return {
        ...state,
        mapYear: action.payload.mapYear,
        xCoord: action.payload.xCoord,
        yCoord: action.payload.yCoord,
        date: moment(`1/1/${action.payload.mapYear}`).utc()
      }
    case EDIT_POI_SET:
      const { id, stories, ...poiFields } = action.payload
      return {
        ...state,
        ...poiFields,
        storyIds: action.payload.stories.map(s => s.id)
      }
    case POI_FORM_EXITED:
      return initialState.poiForm
    default:
      return state
  }
}
