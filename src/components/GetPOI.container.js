import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPois,
  getPoiById,
  getPoisByMapYear,
  getPoisByStoryId,
  postPoi,
  putPoi,
  deletePoi
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
      getPois,
      getPoiById,
      getPoisByMapYear,
      getPoisByStoryId,
      postPoi,
      putPoi,
      deletePoi
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetPOI)
