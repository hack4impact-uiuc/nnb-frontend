import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { createMap } from './../actions'
import MapManager from './MapManager.component'

function mapStateToProps(state) {
  const { maps } = state.timeline
  return {
    mapYears: maps.map(map => map.year)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createMap
    },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapManager)
)
