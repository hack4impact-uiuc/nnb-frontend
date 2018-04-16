import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSelectedMap } from './../actions'
import Interval from './Interval.component'

function mapStateToProps(state, ownProps) {
  return {
    selectedMapId: state.timeline.selectedMapId,
    ...ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSelectedMap }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Interval)
