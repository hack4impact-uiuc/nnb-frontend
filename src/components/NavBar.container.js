import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  toggleSidebar,
  enableEditMode,
  disableEditMode,
  setSelectedStory
} from './../actions'
import NavBar from './NavBar.component'

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ...state.sidebar,
    ...state.timeline,
    isEditing: state.edit.isEditing,
    selectedStoryId: state.stories.selectedStoryId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleSidebar,
      enableEditMode,
      disableEditMode,
      setSelectedStory
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
