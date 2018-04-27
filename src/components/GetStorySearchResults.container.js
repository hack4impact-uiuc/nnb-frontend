import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateStorySearchInput, searchStoryPOIs } from './../actions'
import GetStorySearchResults from './GetStorySearchResults.component'

function mapStateToProps(state) {
  return {
    pois: state.searchPoi.storyPois,
    searchInput: state.searchPoi.storyQuery
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateStorySearchInput,
      searchStoryPOIs
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  GetStorySearchResults
)
