import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  updatePOIFormInput,
  togglePOIFormStoryId,
  addPOIFormLink,
  removePOIFormLink,
  addPOIFormMedia,
  removePOIFormMedia
} from './../actions'
import POIForm from './POIFormNew.component'

function mapStateToProps(state) {
  return {
    ...state.poiForm,
    stories: state.stories.stories
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
      removePOIFormMedia
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(POIForm)
