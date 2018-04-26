import { connect } from 'react-redux'
import Timeline from './Timeline.component'

function mapStateToProps(state) {
  return {
    maps: state.timeline.maps,
    isStorySelected: !!state.stories.selectedStoryId,
    isEditing: state.edit.isEditing
  }
}

export default connect(mapStateToProps)(Timeline)
