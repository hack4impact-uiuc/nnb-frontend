const initialState = {
  stuff: [],
  edit: {
    isEditing: false
  },
  pois: {
    activePOIs: [],
    selectedPOIId: 1
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
