import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSidebar } from './../actions'
import NavBar from './NavBar'

function mapStateToProps(state, ownProps) {
  return {
    ...state.sidebar,
    ...ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleSidebar
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
