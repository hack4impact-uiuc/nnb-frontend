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
import StoryList from './StoryList.component'

function mapStateToProps(state, ownProps) {
  return {
    isEditing: state.edit.isEditing,
    ...state.stories,
    ...state.sidebar,
    ...ownProps
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

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
