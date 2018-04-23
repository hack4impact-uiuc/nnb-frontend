import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { StoryList, POIFormPanel, MapTimeline, Login } from './'
import { Api, storage } from './../utils'
import './../styles/App.css'

class App extends Component {
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
    isLoggedIn: false,
    isUpdatingPOI: false,
    showLogin: false
  }

  constructor(props) {
    super(props)
    this.deleteMap = this.deleteMap.bind(this)
    this.exitStory = this.exitStory.bind(this)
    this.loadMaps = this.loadMaps.bind(this)
    this.loadPOIsForYear = this.loadPOIsForYear.bind(this)
    this.loadStories = this.loadStories.bind(this)
    this.setClickedCoords = this.setClickedCoords.bind(this)
    this.setLogin = this.setLogin.bind(this)
    this.setSelectedPOI = this.setSelectedPOI.bind(this)
    this.setSelectedStory = this.setSelectedStory.bind(this)
    this.setShowLogin = this.setShowLogin.bind(this)
    this.setShowPOIForm = this.setShowPOIForm.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.updateMap = this.updateMap.bind(this)
    this.exitStory = this.exitStory.bind(this)
    this.setIsUpdatingPOI = this.setIsUpdatingPOI.bind(this)
  }

  componentDidMount() {
    this.loadStories()
    this.loadMaps()
    if (storage.get('auth')) {
      this.setLogin(true)
    }

    const { loadMaps, loadStories, setSelectedMap } = this.props
    loadMaps().then(action => {
      const maps = action.payload
      maps.sort((a, b) => a.year - b.year)
      setSelectedMap(maps[0])
    })
    loadStories()
  }

  toggleEditMode() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  loadPOIsForYear(year) {
    return Api.loadPOIs({ mapYear: year }).then(data => {
      this.setState({
        activeEvents: data,
        selectedEvent: null,
        selectedMap: this.state.maps.find(m => m.year === year)
      })
    })
  }

  loadStories() {
    return Api.loadStories().then(data => this.setState({ stories: data }))
  }

  loadMaps() {
    return Api.loadMaps().then(data => {
      data.sort((a, b) => a.year - b.year)
      this.setState({ maps: data })
      if (data[0]) {
        this.loadPOIsForYear(data[0].year)
      }
    })
  }

  deleteMap(mapId) {
    return Api.deleteMap(mapId).then(() => {
      this.setState({ selectedMap: null }, () => this.loadMaps())
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
    Api.loadPOIs({ storyId }).then(storyPOIs => {
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
    const cb = () => {
      this.setState({
        selectedStory: null,
        isStorySelected: false
      })
    }
    const { selectedMap } = this.state
    if (selectedMap) {
      this.loadPOIsForYear(selectedMap.year).then(cb)
    } else {
      cb()
    }
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

  setIsUpdatingPOI(isUpdatingPOI) {
    this.setState({ isUpdatingPOI })
  }

  setShowLogin(val) {
    this.setState({
      showLogin: val
    })
  }

  setLogin(val) {
    this.setState({
      isLoggedIn: val,
      [!val && 'isEditing']: false,
      [!val && 'showPOIForm']: false,
      [!val && 'isUpdatingPOI']: false
    })
    if (val) {
      storage.set('auth', true)
    } else {
      storage.set('auth', false)
    }
  }

  render() {
    const {
      isEditing,
      isLoggedIn,
      isStorySelected,
      maps,
      selectedMap,
      selectedStory,
      showLogin,
      showPOIForm,
      stories
    } = this.state
    const startYearIndex =
      !!selectedMap && maps.findIndex(map => map.year === selectedMap.year)
    const endYearMap =
      startYearIndex !== undefined &&
      startYearIndex !== false &&
      maps[startYearIndex + 1]
    const endYear = (!!endYearMap && endYearMap.year) || 'Present'
    const selectedStoryName =
      !!isStorySelected &&
      stories.find(story => story.id === selectedStory).name

    return (
      <div className="app">
        <StoryList
          {...this.state}
          exitStory={this.exitStory}
          loadStories={this.loadStories}
          setSelectedStory={this.setSelectedStory}
          toggleEditMode={this.toggleEditMode}
          toggleSidebar={this.toggleSidebar}
        />
        {/*TODO: change to is logged in*/}
        {showLogin && (
          <Login setLogin={this.setLogin} setShowLogin={this.setShowLogin} />
        )}
        <Link to="/form"> lets go to the form </Link>
        <div>
          {!showPOIForm &&
            !showLogin && (
              <MapTimeline
                {...this.state}
                deleteMap={this.deleteMap}
                loadMaps={this.loadMaps}
                loadPOIsForYear={this.loadPOIsForYear}
                setClickedCoords={this.setClickedCoords}
                setIsUpdatingPOI={this.setIsUpdatingPOI}
                setSelectedPOI={this.setSelectedPOI}
                setShowPOIForm={this.setShowPOIForm}
                updateMap={this.updateMap}
              />
            )}
          {showPOIForm &&
            !showLogin && (
              <POIFormPanel
                {...this.state}
                loadPOIsForYear={this.loadPOIsForYear}
                setIsUpdatingPOI={this.setIsUpdatingPOI}
                setSelectedPOI={this.setSelectedPOI}
                setShowPOIForm={this.setShowPOIForm}
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
