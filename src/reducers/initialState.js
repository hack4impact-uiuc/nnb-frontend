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
    selectedPOIId: null,
    carouselIndex: 0
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
  }
}

export default initialState
