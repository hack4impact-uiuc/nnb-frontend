import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormMedia,
  addPOIFormYoutubeMedia,
  updatePOI,
  createPOI
} from './../actions'
import POIForm from './POIForm.component'

function mapStateToProps(state) {
  return {
    // TODO: probs should scope all the poi fields into a poi object
    ...state.poiForm,
    stories: state.stories.stories,
    isUpdatingPOI: !!state.pois.selectedPOIId,
    selectedPOIId: state.pois.selectedPOIId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updatePOIFormInput,
      togglePOIFormStoryId,
      addPOIFormMedia,
      addPOIFormYoutubeMedia,
      updatePOI,
      createPOI
    },
    dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(POIForm))
