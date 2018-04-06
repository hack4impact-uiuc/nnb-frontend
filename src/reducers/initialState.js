const initialState = {
  stuff: [],
  edit: {
    isEditing: false
  },
  timeline: {
    maps: [],
    selectedMapId: null
  },
  stories: {
    stories: [],
    selectedStoryId: 1
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
    },
    clipboard: []
  }
}

export default initialState
