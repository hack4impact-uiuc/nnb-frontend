import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getStories,
  getStoriesByPOI,
  getStory,
  postStory,
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
      getStories,
      getStoriesByPOI,
      getStory,
      postStory,
      editStory,
      deleteStory
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStories)
