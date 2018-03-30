import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadMaps, createMap, deleteMap } from './../actions/maps.action'
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
      deleteMap
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetMaps)
