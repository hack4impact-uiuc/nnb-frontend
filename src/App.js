import React, { Component } from 'react'
import {
  InfoPanel,
  NNBMap,
  POIForm,
  StoryList,
  Timeline,
  MapManager,
  OurTable,
  NavBar
} from './components'
import { Api } from './utils'
import './styles/App.css'
import { connect } from 'react-redux'
import { logout } from 'redux/reducer'

class App extends Component {
  // using dummy data until BE api is done
  state = {
    maps: [],
    selectedMap: null,
    activeEvents: [],
    selectedEvent: null,
    stories: [],
    selectedStory: null,
    isStorySelected: false,
    showPOIForm: false,
    showSidebar: false,
    isEditing: false,
    isLoggedIn: false
  }

  constructor(props) {
    super(props)
    this.loadPOIs = this.loadPOIs.bind(this)
    this.loadPOIsForYear = this.loadPOIsForYear.bind(this)
    this.loadStories = this.loadStories.bind(this)
    this.loadMaps = this.loadMaps.bind(this)
    this.deleteMap = this.deleteMap.bind(this)
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
    this.loadStories()
    this.loadMaps()
  }

  loadPOIs() {
    return Api.getPOIs().then(data =>
      this.setState({ activeEvents: data, selectedEvent: null })
    )
  }

  loadPOIsForYear(year) {
    return Api.getPOIsByYear(year).then(data => {
      this.setState({ activeEvents: data.pois, selectedEvent: null })
      this.setState({ selectedMap: data.map })
    })
  }

  loadStories() {
    return Api.getStories().then(data => this.setState({ stories: data }))
  }

  loadMaps() {
    return Api.getMaps().then(data => {
      data.sort((a, b) => a.year - b.year)
      this.setState({ maps: data })
      this.loadPOIsForYear(data[0].year)
    })
  }

  deleteMap(mapId) {
    return Api.deleteMap(mapId).then(() => {
      this.loadMaps()
    })
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
    this.loadPOIsForYear(this.state.selectedMap.year).then(() => {
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
        />
        {/*TODO: change to is logged in*/}
        <NavBar
          showEdit={this.props.isLoginSuccess}
          onEdit={this.toggleEditMode}
          isEditing={isEditing}
        />
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
          {!showPOIForm &&
            isEditing && (
              <div>
                <MapManager
                  {...this.state}
                  loadMaps={this.loadMaps}
                  deleteMap={this.deleteMap}
                />
              </div>
            )}
          {!showPOIForm && (
            <div className="timeline-container">
              <Timeline
                {...this.state}
                loadPOIsForYear={this.loadPOIsForYear}
              />
            </div>
          )}
          {!showPOIForm && (
            <div className="info-panel-container">
              <InfoPanel
                {...this.state}
                setSelectedPOI={this.setSelectedPOI}
                loadPOIsForYear={this.loadPOIsForYear}
                year={
                  this.state.maps && this.state.maps[0]
                    ? this.state.maps[0].year
                    : undefined
                }
              />
            </div>
          )}
          {showPOIForm && (
            <div className="poi-form-container container">
              <POIForm
                {...this.state}
                setSelectedPOI={this.setSelectedPOI}
                setShowPOIForm={this.setShowPOIForm}
                loadPOIsForYear={this.loadPOIsForYear}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoginSuccess: state.isLoginSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
