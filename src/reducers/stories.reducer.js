import initialState from './initialState'
import {
  STORIES_LOADED,
  STORY_CREATED,
  STORY_EDITED,
  STORY_DELETED
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
        stories: [
          state.stories,
          { ...action.payload.storyName, storyId: action.payload.storyId }
        ]
      }
    case STORY_EDITED:
      return {
        ...state,
        stories: [...state.stories].map(
          story =>
            story.storyId === action.payload.storyId
              ? { ...action.payload.storyName, storyId: action.payload.storyId }
              : story
        )
      }
    case STORY_DELETED:
      return {
        ...state,
        stories: [...state.stories].filter(
          story => story.storyId !== action.payload
        )
      }
    default:
      return state
  }
}
