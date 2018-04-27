import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { createMap, loadMaps, loadPOIs } from './../actions'
import MapManager from './MapManager.component'

function mapStateToProps(state) {
  const { maps } = state.timeline
  const authorizationToken = state.auth.authorizationToken

  return {
    mapYears: maps.map(map => map.year),
    authorizationToken
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createMap,
      loadMaps,
      loadPOIs
    },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapManager)
)
