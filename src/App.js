import React, { Component } from 'react'
import { StoryList, POIFormPanel, MapTimeline, NavBar } from './components'
import { Api } from './utils'
import './styles/App.css'
import moment from 'moment'

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
    this.updateMap = this.updateMap.bind(this)
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
    //Check for POI in different map in the case of stories
    let prevSelectedEvent
    if (this.state.selectedEvent) {
      prevSelectedEvent = this.state.selectedEvent.mapByYear
    }
    this.setState(
      {
        selectedEvent: clickedPOI
      },
      () => {
        if (
          this.state.selectedEvent &&
          clickedPOI.mapByYear !== prevSelectedEvent
        ) {
          this.updateMap()
        }
      }
    )
  }

  setSelectedStory(storyId) {
    Api.getPOIsByStory(storyId).then(storyPOIs => {
      storyPOIs.sort(compareYear)
      this.setState(
        {
          selectedStory: storyId,
          isStorySelected: true,
          activeEvents: storyPOIs,
          selectedEvent: storyPOIs[0]
        },
        () => {
          this.updateMap()
        }
      )
    })

    this.toggleSidebar()
  }

  //Update map based on the map year of the currently selected event
  updateMap() {
    if (this.state.selectedEvent) {
      const selectedMap = this.state.maps.find(
        map => map.year === this.state.selectedEvent.mapByYear
      )
      this.setState({ selectedMap })
    }
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
      <div className="app">
        <StoryList
          {...this.state}
          toggleSidebar={this.toggleSidebar}
          setSelectedStory={this.setSelectedStory}
          exitStory={this.exitStory}
          loadStories={this.loadStories}
        />
        {/*TODO: change to is logged in*/}
        <NavBar
          showEdit={true}
          onEdit={this.toggleEditMode}
          isEditing={isEditing}
          toggleSidebar={this.toggleSidebar}
        />
        {/* Comment out the components to leave only the one you need to work on */}
        <div>
          {!showPOIForm && (
            <MapTimeline
              {...this.state}
              setSelectedPOI={this.setSelectedPOI}
              setShowPOIForm={this.setShowPOIForm}
              setClickedCoords={this.setClickedCoords}
              loadMaps={this.loadMaps}
              deleteMap={this.deleteMap}
              loadPOIsForYear={this.loadPOIsForYear}
              updateMap={this.updateMap}
            />
          )}
          {showPOIForm && (
            <POIFormPanel
              {...this.state}
              setSelectedPOI={this.setSelectedPOI}
              setShowPOIForm={this.setShowPOIForm}
              loadPOIsForYear={this.loadPOIsForYear}
              updateMap={this.updateMap}
            />
          )}
        </div>
      </div>
    )
  }
}

function compareYear(a, b) {
  return moment(a.date).isAfter(moment(b.date))
}

export default App
