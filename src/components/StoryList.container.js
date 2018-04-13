import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  deleteStory,
  setSelectedStory,
  toggleSidebar,
  showStoryForm,
  setEditingStoryId,
  updateStoryNameInput,
  loadPOIs,
  disableEditMode
} from './../actions'
import StoryList from './StoryList.component'

function mapStateToProps(state) {
  const {
    shouldShowSidebar,
    shouldShowStoryForm,
    editingStoryId
  } = state.sidebar
  return {
    isEditing: state.edit.isEditing,
    ...state.stories,
    ...{ shouldShowSidebar, shouldShowStoryForm, editingStoryId }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteStory,
      setSelectedStory,
      toggleSidebar,
      showStoryForm,
      setEditingStoryId,
      updateStoryNameInput,
      loadPOIs,
      disableEditMode
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
