import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { ROUTES } from './../'
import {
  loadMaps,
  loadStories,
  setSelectedPOI,
  loadPOIs,
  deletePOI,
  enableEditMode,
  removePOIFormMedia,
  setNextPOIInStory,
  setPreviousPOIInStory,
  modifyPOIFormCaption,
  modifyPoisCarouselIndex,
  copyPOI,
  editPOI
} from './../actions'
import InfoPanel from './InfoPanel.component'

function mapStateToProps(state, ownProps) {
  const { timeline, pois, stories, edit, poiForm } = state
  const { maps, selectedMapId } = timeline
  const { activePOIs, selectedPOIId } = pois
  const { selectedStoryId } = stories

  const shouldShowRealTimePOI = ownProps.location.pathname === ROUTES.FORM

  const selectedPOIIndex = activePOIs.findIndex(poi => poi.id === selectedPOIId)
  const isStorySelected = !!selectedStoryId

  const { meta, ...realTimePOI } = poiForm
  const selectedPOI = shouldShowRealTimePOI
    ? realTimePOI
    : activePOIs[selectedPOIIndex]

  return {
    ...state.pois,
    ...state.stories,
    ...edit,
    selectedPOIIndex,
    selectedPOI,
    selectedMap: maps.find(map => map.id === selectedMapId),
    isStorySelected,
    isFirstInStory: isStorySelected && selectedPOIIndex === 0,
    isLastInStory: isStorySelected && selectedPOIIndex === activePOIs.length - 1
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadMaps,
      loadStories,
      setSelectedPOI,
      loadPOIs,
      deletePOI,
      enableEditMode,
      removePOIFormMedia,
      setNextPOIInStory,
      setPreviousPOIInStory,
      modifyPOIFormCaption,
      modifyPoisCarouselIndex,
      copyPOI,
      editPOI
    },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InfoPanel)
)
