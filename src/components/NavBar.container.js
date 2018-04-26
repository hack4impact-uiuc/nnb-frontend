import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  toggleSidebar,
  enableEditMode,
  disableEditMode,
  setSelectedStory,
  loadPOIs,
  logout
} from './../actions'
import NavBar from './NavBar.component'

function mapStateToProps(state, ownProps) {
  return {
    ...state.sidebar,
    ...state.timeline,
    ...state.stories,
    isEditing: state.edit.isEditing,
    selectedStoryId: state.stories.selectedStoryId,
    isLoggedIn: state.auth.isLoggedIn,
    pathname: ownProps.location.pathname
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleSidebar,
      enableEditMode,
      disableEditMode,
      setSelectedStory,
      loadPOIs,
      logout
    },
    dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
