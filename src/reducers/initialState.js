const initialState = {
  stuff: [],
  edit: {
    isEditing: false,
    shouldShowRealTimePOI: false
  },
  timeline: {
    maps: [],
    selectedMapId: null
  },
  stories: {
    stories: [],
    selectedStoryId: null
  },
  pois: {
    activePOIs: [],
    selectedPOIId: null
  },
  poiForm: {
    name: '',
    date: '',
    description: '',
    storyIds: [],
    media: [],
    links: [],
    meta: {
      isUploadingMedia: false,
      shouldShowFormValidation: false
    }
  },
  searchPoi: {
    uniPois: [],
    uniQuery: '',
    editStoryPois: [],
    editStoryQuery: ''
  }
}

export default initialState
