import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  toggleSidebar,
  enableEditMode,
  disableEditMode,
  setSelectedStory,
  loadPOIs
} from './../actions'
import NavBar from './NavBar.component'

function mapStateToProps(state, ownProps) {
  return {
    // ...ownProps,
    ...state.sidebar,
    ...state.timeline,
    ...state.stories,
    isEditing: state.edit.isEditing,
    selectedStoryId: state.stories.selectedStoryId,
    isLoggedIn: state.auth.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleSidebar,
      enableEditMode,
      disableEditMode,
      setSelectedStory,
      loadPOIs
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
