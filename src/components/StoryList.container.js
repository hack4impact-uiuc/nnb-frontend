import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  loadStories,
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
    ...ownProps,
    // TODO: integrate with redux store edit
    // isEditing: state.edit.isEditing,
    ...state.stories,
    ...state.sidebar
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadStories,
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
