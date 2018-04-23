import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from './../actions'
import LoginPage from './LoginPage.component'

function mapStateToProps(state) {
  return {
    ...state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
