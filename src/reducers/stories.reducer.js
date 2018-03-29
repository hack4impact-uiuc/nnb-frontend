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
          ...state.stories,
          { storyName: action.payload.storyName, id: action.payload.id }
        ]
      }
    case STORY_EDITED:
      return {
        ...state,
        stories: [...state.stories].map(
          story =>
            story.id === action.payload.id
              ? { storyName: action.payload.storyName, id: action.payload.id }
              : story
        )
      }
    case STORY_DELETED:
      return {
        ...state,
        stories: [...state.stories].filter(
          story => story.id !== action.payload
        )
      }
    default:
      return state
  }
}
