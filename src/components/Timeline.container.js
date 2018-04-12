import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSelectedMap } from './../actions'
import Timeline from './Timeline.component'

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    maps: state.timeline.maps,
    isStorySelected: !!state.stories.selectedStoryId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSelectedMap }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
