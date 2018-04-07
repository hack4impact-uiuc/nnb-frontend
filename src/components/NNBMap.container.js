import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSelectedPOI } from './../actions'
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
      setSelectedPOI
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NNBMap)
