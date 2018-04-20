import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSidebar, loadEditingPois } from './../actions'
import EditStoryModal from './EditStoryModal.component'

function mapStateToProps(state) {
  return {
    // inputPois: state.sidebar.inputPois
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleSidebar,
      loadEditingPois
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStoryModal)
