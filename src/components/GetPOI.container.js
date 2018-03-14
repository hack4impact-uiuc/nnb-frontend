import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPois,
  getPoiById,
  getPoiByMapYear,
  getPoiByStoryId
} from './../actions'
import GetPOI from './GetPOI.component'

function mapStateToProps(state) {
  return {
    pois: state.getPoi.pois
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPois,
      getPoiById,
      getPoiByMapYear,
      getPoiByStoryId
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetPOI)
