import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadMaps, loadPOIsByMapYear, loadStories, copyPOI } from './../actions'
import InfoPanel from './InfoPanel.component'

function mapStateToProps(state, ownProps) {
  return {
    pois: state.pois,
    stories: state.stories,
    ...ownProps,
    clipboard: state.poiForm.clipboard
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadMaps,
      loadPOIsByMapYear,
      loadStories,
      copyPOI
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel)
