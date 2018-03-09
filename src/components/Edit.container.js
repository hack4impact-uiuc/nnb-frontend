import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { enableEditMode, disableEditMode } from './../actions'
import Edit from './Edit.component'

function mapStateToProps(state) {
  return {
    isEditing: state.edit.isEditing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enableEditMode,
      disableEditMode
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
