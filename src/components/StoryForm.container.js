import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  createStory,
  updateStory,
  hideStoryForm,
  updateStoryNameInput,
  setEditingStoryId
} from './../actions'
import StoryForm from './StoryForm.component'

function mapStateToProps(state) {
  const authorizationToken = state.auth.authorizationToken

  return {
    stories: state.stories.stories,
    editingStoryId: state.sidebar.editingStoryId,
    inputStoryName: state.sidebar.inputStoryName,
    authorizationToken
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createStory,
      updateStory,
      hideStoryForm,
      updateStoryNameInput,
      setEditingStoryId
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm)
