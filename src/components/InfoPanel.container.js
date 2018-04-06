import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadMaps, loadPOIsByMapYear, loadStories } from './../actions'
import InfoPanel from './InfoPanel.component'

function mapStateToProps(state, ownProps) {
  return {
    pois: state.pois,
    stories: state.stories,
    ...ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadMaps,
      loadPOIsByMapYear,
      loadStories
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel)
