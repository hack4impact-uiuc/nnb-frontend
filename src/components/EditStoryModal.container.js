import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSidebar } from './../actions'
import EditStoryModal from './EditStoryModal.component'

function mapStateToProps(state) {
  return {
    // pois: state.searchPoi.editStoryPois,
    // searchInput: state.searchPoi.editStoryQuery
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

export default connect(mapStateToProps, mapDispatchToProps)(EditStoryModal)
