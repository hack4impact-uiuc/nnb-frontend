import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { createMap, loadMaps, loadPOIs, deleteMap } from './../actions'
import MapManager from './MapManager.component'

function mapStateToProps(state) {
  const { maps, selectedMapId } = state.timeline
  return {
    ...state.pois,
    mapYears: maps.map(map => map.year),
    selectedMap: maps.find(map => map.id === selectedMapId)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createMap,
      loadMaps,
      loadPOIs,
      deleteMap
    },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapManager)
)
