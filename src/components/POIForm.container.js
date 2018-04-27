import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormMedia,
  removePOIFormMedia,
  loadMaps,
  loadPOIs,
  loadStories,
  pastePOI,
  addPOIFormYoutubeMedia,
  updatePOI,
  createPOI
} from './../actions'
import POIForm from './POIForm.component'

function mapStateToProps(state) {
  const authorizationToken = state.auth.authorizationToken

  return {
    // TODO: probs should scope all the poi fields into a poi object
    ...state.poiForm,
    stories: [...state.stories.stories].sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
    isUpdatingPOI: !!state.pois.selectedPOIId,
    selectedPOIId: state.pois.selectedPOIId,
    authorizationToken
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updatePOIFormInput,
      togglePOIFormStoryId,
      addPOIFormMedia,
      removePOIFormMedia,
      loadMaps,
      loadPOIs,
      loadStories,
      pastePOI,
      addPOIFormYoutubeMedia,
      updatePOI,
      createPOI
    },
    dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(POIForm))
