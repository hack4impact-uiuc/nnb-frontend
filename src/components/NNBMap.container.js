import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  setSelectedPOI,
  createNewPOI,
  deleteMap,
  loadMaps,
  loadPOIs
} from './../actions'
import NNBMap from './NNBMap.component'

function mapStateToProps(state) {
  const { maps, selectedMapId } = state.timeline
  return {
    ...state.pois,
    selectedMap: maps.find(map => map.id === selectedMapId),
    isEditing: state.edit.isEditing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSelectedPOI,
      createNewPOI,
      deleteMap,
      loadMaps,
      loadPOIs
    },
    dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NNBMap))
