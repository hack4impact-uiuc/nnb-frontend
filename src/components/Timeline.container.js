import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { enableShowMapsMode, disableShowMapsMode } from './../actions'
import Timeline from './Timeline.component'

function mapStateToProps(state) {
  return {
    isShowing: state.show.isShowing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enableShowMapsMode,
      disableShowMapsMode
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
