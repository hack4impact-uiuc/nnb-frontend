import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { enableShowMap, disableShowMap } from './../actions'
import Timeline from './Timeline.component'

function mapStateToProps(state) {
  return {
    showingMap: state.showMap.showingMap
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enableShowMap,
      disableShowMap
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
