import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  updateUniversalSearchInput,
  searchUniversalPOIs,
  setSelectedPOI,
  setSelectedMap
} from './../actions'
import GetUniversalSearchResults from './GetUniversalSearchResults.component'

function mapStateToProps(state) {
  return {
    pois: state.searchPoi.universalPois,
    searchInput: state.searchPoi.universalQuery,
    selectedPoi: state.pois.selectedPOIId,
    maps: state.timeline.maps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateUniversalSearchInput,
      searchUniversalPOIs,
      setSelectedPOI,
      setSelectedMap
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  GetUniversalSearchResults
)
