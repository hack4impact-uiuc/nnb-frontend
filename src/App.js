import React, { Component } from 'react'
import { Grid, Navbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { InfoPanel, NNBMap, POIForm, StoryList } from './components'
import { pois, stories, Api } from './utils'
import './styles/App.css'

class App extends Component {
  // using dummy data until BE api is done
  state = {
    activeEvents: pois,
    selectedEvent: pois[0],
    stories: stories,
    selectedStory: null,
    isStorySelected: false,
    showPOIForm: false,
    showSidebar: false,
    isEditing: true
  }

  constructor(props) {
    super(props)
    this.loadPOIs = this.loadPOIs.bind(this)
    this.loadStories = this.loadStories.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.setSelectedPOI = this.setSelectedPOI.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.setShowPOIForm = this.setShowPOIForm.bind(this)
    this.setClickedCoords = this.setClickedCoords.bind(this)
    this.setSelectedStory = this.setSelectedStory.bind(this)
    this.exitStory = this.exitStory.bind(this)
  }

  toggleEditMode() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  componentDidMount() {
    // example of how to use api requests
    this.loadPOIs()
    this.loadStories()
  }

  loadPOIs() {
    return Api.getPOIs().then(data =>
      this.setState({ activeEvents: data, selectedEvent: data[0] })
    )
  }

  loadStories() {
    return Api.getStories().then(data => this.setState({ stories: data }))
  }

  setSelectedPOI(POIMarkerId) {
    const clickedPOI = this.state.activeEvents.find(
      POI => POI.id === POIMarkerId
    )
    this.setState({
      selectedEvent: clickedPOI
    })
  }

  setSelectedStory(storyId) {
    Api.getPOIsByStory(storyId).then(storyPOIs => {
      this.setState({
        selectedStory: storyId,
        isStorySelected: true,
        activeEvents: storyPOIs,
        selectedEvent: storyPOIs[0]
      })
    })
  }

  exitStory() {
    this.loadPOIs().then(() => {
      this.setState({
        selectedStory: null,
        isStorySelected: false
      })
    })
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  setShowPOIForm(shouldShow) {
    this.setState({
      showPOIForm: shouldShow
    })
  }

  setClickedCoords(coords) {
    this.setState({
      clickedCoords: coords
    })
  }

  render() {
    const { showPOIForm, isEditing } = this.state

    return (
      <div>
        <StoryList
          {...this.state}
          toggleSidebar={this.toggleSidebar}
          setSelectedStory={this.setSelectedStory}
          exitStory={this.exitStory}
          loadStories={this.loadStories}
          toggleEditMode={this.toggleEditMode}
        />
        <Navbar inverse>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <div className="sidebar-menu" onClick={this.toggleSidebar}>
                  =
                </div>
                <a href="/">NNB</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <ToggleButtonGroup
              type="checkbox"
              value={isEditing ? [1] : []}
              onChange={this.toggleEditMode}
            >
              <ToggleButton value={1}>Edit</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Navbar>
        {/* Comment out the components to leave only the one you need to work on */}
        <div className="nnb-app">
          {!showPOIForm && (
            <div className="nnb-map-container">
              <NNBMap
                {...this.state}
                setSelectedPOI={this.setSelectedPOI}
                setShowPOIForm={this.setShowPOIForm}
                setClickedCoords={this.setClickedCoords}
              />
            </div>
          )}
          {!showPOIForm && (
            <div className="info-panel-container">
              <InfoPanel {...this.state} setSelectedPOI={this.setSelectedPOI} />
            </div>
          )}
          {showPOIForm && (
            <div className="poi-form-container container">
              <POIForm
                {...this.state}
                setShowPOIForm={this.setShowPOIForm}
                loadPOIs={this.loadPOIs}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
