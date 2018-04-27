import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  createStory,
  updateStory,
  hideStoryForm,
  updateStoryNameInput,
  setEditingStoryId,
  updateSelectedPois,
  exitStoryModal
} from './../actions'
import StoryForm from './StoryForm.component'

function mapStateToProps(state) {
  return {
    stories: state.stories.stories,
    editingStoryId: state.sidebar.editingStoryId,
    inputStoryName: state.sidebar.inputStoryName,
    selectedPois: state.sidebar.selectedPois
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createStory,
      updateStory,
      hideStoryForm,
      updateStoryNameInput,
      setEditingStoryId,
      updateSelectedPois,
      exitStoryModal
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm)
