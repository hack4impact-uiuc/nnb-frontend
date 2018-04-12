import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addPOIFormLink,
  removePOIFormLink,
  modifyPOIFormLink
} from './../actions'
import LinkTable from './LinkTable.component'

function mapStateToProps(state) {
  return {
    links: state.poiForm.links
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addPOIFormLink,
      removePOIFormLink,
      modifyPOIFormLink
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkTable)
