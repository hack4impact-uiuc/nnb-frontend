import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  loadStories,
  loadStoriesByPOIId,
  postStory,
  updateStory,
  deleteStory
} from './../actions'
import GetStories from './GetStories.component'

function mapStateToProps(state) {
  return {
    stories: state.stories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadStories,
      loadStoriesByPOIId,
      postStory,
      updateStory,
      deleteStory
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStories)
