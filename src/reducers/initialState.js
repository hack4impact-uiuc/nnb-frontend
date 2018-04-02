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
  }
}

export default initialState
