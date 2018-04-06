import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadMaps, loadPOIsByMapYear, loadStories } from './../actions'
import App from './App'

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

export default connect(null, mapDispatchToProps)(App)
