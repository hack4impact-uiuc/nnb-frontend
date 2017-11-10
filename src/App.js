import React, { Component } from 'react'
import { Grid, Navbar, Button } from 'react-bootstrap'
import { InfoPanel, NNBMap, POIForm } from './components'
import { pois } from './utils/dummyData'
import './styles/App.css'

class App extends Component {
  // using dummy data until BE api is done
  state = {
    activeEvents: pois,
    selectedEvent: pois[0],
    showPOIForm: false,
    isEditing: false
  }

  constructor(props) {
    super(props)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.setSelectedPOI = this.setSelectedPOI.bind(this)
    this.setShowPOIForm = this.setShowPOIForm.bind(this)
  }

  toggleEditMode() {
    const isEditing = this.state.isEditing
    this.setState({
      isEditing: !isEditing
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

  setShowPOIForm(shouldShow) {
    this.setState({
      showPOIForm: shouldShow
    })
  }

  render() {
    const { showPOIForm } = this.state

    return (
      <div>
        <Navbar inverse>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">NNB</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Button onClick={this.toggleEditMode}>Edit</Button>
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
              />
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
