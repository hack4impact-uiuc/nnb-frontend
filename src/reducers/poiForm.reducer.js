import initialState from './initialState'
import {
  POI_FORM_INPUT_CHANGED,
  POI_FORM_STORY_ID_TOGGLED,
  POI_FORM_LINK_ADDED,
  POI_FORM_LINK_REMOVED,
  POI_FORM_LINK_MODIFIED,
  POI_FORM_MEDIA_ADDED,
  POI_FORM_MEDIA_REMOVED,
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
        media: [...state.media].filter(
          media => media.contentUrl !== action.payload.contentUrl
        )
      }
    case NEW_POI_CREATION_STARTED:
      return {
        ...state,
        mapYear: action.payload.mapYear,
        xCoord: action.payload.xCoord,
        yCoord: action.payload.yCoord
      }
    case EDIT_POI_SET:
      // TODO: make consistent naming between pois and poiForm
      return {
        ...state,
        // ...action.payload,
        name: action.payload.name,
        // copying date causes app to explode ¯\_(ツ)_/¯
        // date: action.payload.date,
        description: action.payload.description,
        mapYear: action.payload.mapYear,
        xCoord: action.payload.xCoord,
        yCoord: action.payload.yCoord,
        storyIds: action.payload.stories.map(s => s.id),
        media: action.payload.media,
        links: action.payload.links
      }
    case POI_FORM_EXITED:
      return initialState.poiForm
    default:
      return state
  }
}
