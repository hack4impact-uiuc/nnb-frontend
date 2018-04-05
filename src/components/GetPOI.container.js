import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  loadPOIs,
  loadPOIById,
  loadPOIsByMapYear,
  loadPOIsByStoryId,
  createPOI,
  updatePOI,
  deletePOI
} from './../actions'
import GetPOI from './GetPOI.component'

function mapStateToProps(state) {
  return {
    pois: state.pois
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadPOIs,
      loadPOIById,
      loadPOIsByMapYear,
      loadPOIsByStoryId,
      createPOI,
      updatePOI,
      deletePOI
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetPOI)
