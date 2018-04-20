import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadMaps, loadStories, setSelectedMap } from './../actions'
import App from './App'

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadMaps,
      loadStories,
      setSelectedMap
    },
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(App)
