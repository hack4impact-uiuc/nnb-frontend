import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  createStory,
  updateStory,
  deleteStory,
  setSelectedStory,
  toggleSidebar,
  showStoryForm,
  hideStoryForm,
  setEditingStoryId,
  updateStoryNameInput
} from './../actions'
import StoryForm from './StoryForm.component'

function mapStateToProps(state) {
  return {
    ...state.stories,
    ...state.sidebar
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createStory,
      updateStory,
      deleteStory,
      setSelectedStory,
      toggleSidebar,
      showStoryForm,
      hideStoryForm,
      setEditingStoryId,
      updateStoryNameInput
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm)
