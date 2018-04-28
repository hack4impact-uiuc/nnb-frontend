import { connect } from 'react-redux'
import FormPage from './FormPage.component'

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps)(FormPage)
