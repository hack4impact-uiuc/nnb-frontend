import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { exitStoryModal } from './../actions'
import StoryModal from './StoryModal.component'

function mapStateToProps(state) {
  return {
    shouldShowModal: state.sidebar.shouldShowModal
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      exitStoryModal
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryModal)
