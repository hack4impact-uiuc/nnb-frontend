import initialState from './initialState'
import {
  STORIES_LOADED,
  STORY_CREATED,
  STORY_UPDATED,
  STORY_DELETED,
  STORY_SELECTED
} from './../actions/actionTypes'

export default function stories(state = initialState.stories, action) {
  switch (action.type) {
    case STORIES_LOADED:
      return {
        ...state,
        stories: action.payload
      }
    case STORY_CREATED:
      return {
        ...state,
        stories: [...state.stories, action.payload]
      }
    case STORY_UPDATED:
      return {
        ...state,
        stories: [...state.stories].map(
          story => (story.id === action.payload.id ? action.payload : story)
        )
      }
    case STORY_DELETED:
      return {
        ...state,
        stories: [...state.stories].filter(
          story => story.id !== action.payload.id
        )
      }
    case STORY_SELECTED:
      return {
        ...state,
        selectedStoryId: action.payload.id
      }
    default:
      return state
  }
}
