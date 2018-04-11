import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  createStory,
  updateStory,
  hideStoryForm,
  updateStoryNameInput
} from './../actions'
import StoryForm from './StoryForm.component'

function mapStateToProps(state) {
  return {
    stories: state.stories.stories,
    editingStoryId: state.sidebar.editingStoryId,
    inputStoryName: state.sidebar.inputStoryName
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createStory,
      updateStory,
      hideStoryForm,
      updateStoryNameInput
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm)
