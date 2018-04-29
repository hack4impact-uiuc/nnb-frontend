import { connect } from 'react-redux'
import StoryModal from './StoryModal.component'

function mapStateToProps(state) {
  return {
    shouldShowModal: state.sidebar.shouldShowModal
  }
}

export default connect(mapStateToProps, null)(StoryModal)
