import initialState from './initialState'
import {
  POI_FORM_INPUT_CHANGED,
  POI_FORM_STORY_ID_TOGGLED,
  POI_FORM_LINK_ADDED,
  POI_FORM_LINK_REMOVED,
  POI_FORM_LINK_MODIFIED,
  POI_FORM_MEDIA_ADDED,
  POI_FORM_MEDIA_REMOVED,
  POI_COPIED,
  POI_FORM_POI_PASTED
} from '../actions/actionTypes'

const POI_FORM_MAX_CLIPBOARD_LENGTH = 5

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
      const newLinks = [...state.links]
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
        media: [...state.media].filter(media => media.id !== action.payload.id)
      }
<<<<<<< fe189c0b4ea96d83be990b2def928fad0dbb37be
    case POI_COPIED:
      const copyClipboard = [...state.clipboard].filter(
        poi => poi.id !== action.payload.id
      )
      if (copyClipboard.length === POI_FORM_MAX_CLIPBOARD_LENGTH)
        copyClipboard.pop()
      copyClipboard.unshift(action.payload)
      return {
        ...state,
        clipboard: copyClipboard
      }
    case POI_FORM_POI_PASTED:
      const pasteClipboard = [...state.clipboard].filter(
        poi => poi.id !== action.payload.id
      )
      pasteClipboard.unshift(action.payload)
      return {
        ...state,
        clipboard: pasteClipboard,
        name: action.payload.name,
        date: action.payload.date,
        description: action.payload.description,
        storyIds: action.payload.stories.map(story => story.id)
        // media: action.payload.media,
        // links: action.payload.links
=======
    case POI_FORM_POI_COPIED:
    case POI_FORM_POI_PASTED:
      var newClipboard = [...state.clipboard].filter(
        poi => poi.id !== action.payload.id
      )
      if (newClipboard.length === MAX_CLIPBOARD_LENGTH) newClipboard.pop()
      newClipboard.unshift(action.payload)
      return {
        ...state,
        clipboard: newClipboard
>>>>>>> moved copy-paste to POI form. need to move copy to infopanel
      }
    default:
      return state
  }
}
