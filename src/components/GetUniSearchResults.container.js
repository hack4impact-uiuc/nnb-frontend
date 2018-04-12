import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUniSearchInput, uniSearchPOIs } from './../actions'
import GetUniSearchResults from './GetUniSearchResults.component'

function mapStateToProps(state) {
  return {
    pois: state.searchPoi.pois,
    uniSearchInput: state.searchPoi.query
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateUniSearchInput,
      uniSearchPOIs
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GetUniSearchResults)
