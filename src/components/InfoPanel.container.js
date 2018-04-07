import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  loadMaps,
  loadStories,
  setSelectedPOI,
  loadPOIs,
  deletePOI,
  enableEditMode,
  removePOIFormMedia
} from './../actions'
import InfoPanel from './InfoPanel.component'

function mapStateToProps(state, ownProps) {
  const { timeline, pois, stories, edit } = state
  const { maps, selectedMapId } = timeline
  const { activePOIs, selectedPOIId } = pois
  const { selectedStoryId } = stories

  const selectedPOIIndex = activePOIs.findIndex(poi => poi.id === selectedPOIId)
  const isStorySelected = !!selectedStoryId

  return {
    ...state.pois,
    ...state.stories,
    ...ownProps,
    selectedPOIIndex,
    selectedPOI: activePOIs[selectedPOIIndex],
    selectedMap: maps.find(map => map.id === selectedMapId),
    isStorySelected,
    isFirstInStory: isStorySelected && selectedPOIIndex === 0,
    isLastInStory:
      isStorySelected && selectedPOIIndex === activePOIs.length - 1,
    ...edit
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
      removePOIFormMedia
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel)
