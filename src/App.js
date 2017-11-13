import React, { Component } from 'react'
import { Grid, Navbar } from 'react-bootstrap'
import { InfoPanel, NNBMap, POIForm, StoryList } from './components'
import { pois, stories } from './utils/dummyData'
import './styles/App.css'

class App extends Component {
  // using dummy data until BE api is done
  state = {
    activeEvents: pois,
    selectedEvent: pois[0],
    stories: stories,
    showPOIForm: false,
    showSidebar: false,
    isEditing: true
  }

  constructor(props) {
    super(props)
    this.setSelectedPOI = this.setSelectedPOI.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  setSelectedPOI(POIMarkerId) {
    const clickedPOI = this.state.activeEvents.find(
      POI => POI.id === POIMarkerId
    )
    this.setState({
      selectedEvent: clickedPOI
    })
  }

  toggleSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar })
  }

  render() {
    const { showPOIForm } = this.state

    return (
      <div>
        <StoryList {...this.state} toggleSidebar={this.toggleSidebar} />
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
          </Grid>
        </Navbar>
        {/* Comment out the components to leave only the one you need to work on */}
        <div className="nnb-app">
          {!showPOIForm && (
            <div className="nnb-map-container">
              <NNBMap {...this.state} setSelectedPOI={this.setSelectedPOI} />
            </div>
          )}
          {!showPOIForm && (
            <div className="info-panel-container">
              <InfoPanel {...this.state} />
            </div>
          )}
          {showPOIForm && (
            <div className="poi-form-container">
              <POIForm {...this.state} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
