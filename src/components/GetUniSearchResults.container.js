import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  updateUniSearchInput,
  uniSearchPOIs,
  setSelectedPOI
} from './../actions'
import GetUniSearchResults from './GetUniSearchResults.component'

function mapStateToProps(state) {
  return {
    pois: state.searchPoi.pois,
    uniSearchInput: state.searchPoi.query,
    selectedPoi: state.pois.selectedPOIId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateUniSearchInput,
      uniSearchPOIs,
      setSelectedPOI
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetUniSearchResults)
