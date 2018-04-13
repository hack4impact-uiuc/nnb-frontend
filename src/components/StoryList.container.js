import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  deleteStory,
  setSelectedStory,
  toggleSidebar,
  showStoryForm,
  setEditingStoryId,
  updateStoryNameInput
} from './../actions'
import StoryList from './StoryList.component'

function mapStateToProps(state, ownProps) {
  const {
    shouldShowSidebar,
    shouldShowStoryForm,
    editingStoryId
  } = state.sidebar
  return {
    isEditing: ownProps.isEditing,
    // TODO: integrate with redux store edit
    // isEditing: state.edit.isEditing,
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
      updateStoryNameInput
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
