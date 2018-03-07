import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStuff } from './../actions'
import StuffList from './StuffList.component'

function mapStateToProps(state) {
  return {
    stuff: state.stuff
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStuff }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StuffList)
