import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  createStory,
  updateStory,
  deleteStory,
  setSelectedStory,
  toggleSidebar
} from './../actions'
import StoryList from './StoryList.component'

function mapStateToProps(state, ownProps) {
  return {
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
      toggleSidebar
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
