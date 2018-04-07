import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  loadMaps,
  loadPOIsByMapYear,
  loadStories,
  setSelectedMap
} from './../actions'
import App from './App'

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadMaps,
      loadPOIsByMapYear,
      loadStories,
      setSelectedMap
    },
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(App)
