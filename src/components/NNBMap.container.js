import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSelectedPOI } from './../actions'
import NNBMap from './NNBMap.component'

function mapStateToProps(state) {
  return {
    ...state.pois
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
