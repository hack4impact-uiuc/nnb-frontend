const initialState = {
  edit: {
    isEditing: false
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
    mapYear: null,
    xCoord: null,
    yCoord: null,
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
  },
  sidebar: {
    shouldShowSidebar: false,
    shouldShowStoryForm: false,
    editingStoryId: null,
    inputStoryName: ''
  },
  auth: {
    isLoggedIn: false
  }
}

export default initialState
