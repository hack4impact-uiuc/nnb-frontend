import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadMaps, createMap, removeMap } from './../actions/maps.action'
import GetMaps from './GetMaps.component'

function mapStateToProps(state) {
  return {
    maps: state.timeline.maps,
    selectedMapId: state.timeline.selectedMapId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadMaps,
      createMap,
      removeMap
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetMaps)
