import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia,
  loadMaps,
  loadPOIs,
  loadStories,
  addPOIFormYoutubeMedia,
  exitPOIForm,
  updatePOI,
  createPOI
} from './../actions'
import POIForm from './POIFormNew.component'

function mapStateToProps(state) {
  return {
    ...state.poiForm,
    stories: state.stories.stories,
    isUpdatingPOI: !!state.pois.selectedPOIId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updatePOIFormInput,
      togglePOIFormStoryId,
      addPOIFormLink,
      removePOIFormLink,
      addPOIFormMedia,
      removePOIFormMedia,
      loadMaps,
      loadPOIs,
      loadStories,
      addPOIFormYoutubeMedia,
      exitPOIForm,
      updatePOI,
      createPOI
    },
    dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(POIForm))
