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
  loadEditingPois,
  showStoryModal
} from './../actions'
import StoryList from './StoryList.component'

function mapStateToProps(state, ownProps) {
  const {
    shouldShowSidebar,
    shouldShowStoryForm,
    editingStoryId,
    shouldShowModal
  } = state.sidebar
  return {
    isEditing: ownProps.isEditing,
    // TODO: integrate with redux store edit
    // isEditing: state.edit.isEditing,
    ...state.stories,
    ...{
      shouldShowSidebar,
      shouldShowStoryForm,
      editingStoryId,
      shouldShowModal
    }
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
      loadEditingPois,
      showStoryModal
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
