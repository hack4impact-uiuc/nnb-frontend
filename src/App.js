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
    if (
      this.state.selectedEvent &&
      clickedPOI.mapByYear !== this.state.selectedEvent.mapByYear
    ) {
      this.setState(
        {
          selectedEvent: clickedPOI
        },
        () => {
          this.updateMap()
        }
      )
    } else {
      this.setState({
        selectedEvent: clickedPOI
      })
    }
  }

  setSelectedStory(storyId) {
    function compareYr(a, b) {
      return moment(a.date).isAfter(moment(b.date))
    }

    Api.getPOIsByStory(storyId).then(storyPOIs => {
      storyPOIs.sort(compareYr)
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
      const mp = this.state.maps.find(
        map => map.year === this.state.selectedEvent.mapByYear
      )
      this.setState({ selectedMap: mp })
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
          showEdit={true}
          onEdit={this.toggleEditMode}
          isEditing={isEditing}
          toggleSidebar={this.toggleSidebar}
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
              {isEditing && (
                <div>
                  <MapManager
                    {...this.state}
                    loadMaps={this.loadMaps}
                    deleteMap={this.deleteMap}
                  />
                </div>
              )}
              <div className="timeline-container">
                <Timeline
                  {...this.state}
                  loadPOIsForYear={this.loadPOIsForYear}
                />
              </div>
            </div>
          )}

          {!showPOIForm && (
            <div className="info-panel-container">
              <InfoPanel
                {...this.state}
                setSelectedPOI={this.setSelectedPOI}
                loadPOIsForYear={this.loadPOIsForYear}
                updateMap={this.updateMap}
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

export default App
