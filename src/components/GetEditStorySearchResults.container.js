import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEditStorySearchInput, editStorySearchPOIs } from './../actions'
import GetEditStorySearchResults from './GetEditStorySearchResults.component'

function mapStateToProps(state) {
  return {
    pois: state.searchPoi.editStoryPois,
    searchInput: state.searchPoi.editStoryQuery
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateEditStorySearchInput,
      editStorySearchPOIs
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  GetEditStorySearchResults
)
