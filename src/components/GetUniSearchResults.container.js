import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  updateUniSearchInput,
  uniSearchPOIs,
  setSelectedPOI,
  setSelectedMap
} from './../actions'
import GetUniSearchResults from './GetUniSearchResults.component'

function mapStateToProps(state) {
  return {
    pois: state.searchPoi.uniPois,
    searchInput: state.searchPoi.uniQuery,
    selectedPoi: state.pois.selectedPOIId,
    maps: state.timeline.maps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateUniSearchInput,
      uniSearchPOIs,
      setSelectedPOI,
      setSelectedMap
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetUniSearchResults)
