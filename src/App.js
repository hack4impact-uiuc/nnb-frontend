import React, { Component } from 'react'
import { Grid, Navbar } from 'react-bootstrap'
import { InfoPanel, NNBMap, POIForm } from './components'
import { pois } from './utils/dummyData'
import './styles/App.css'

class App extends Component {
  // using dummy data until BE api is done
  state = {
    activeEvents: pois,
    selectedEvent: pois[0],
    showPOIForm: false
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
          </Grid>
        </Navbar>
        {/* Comment out the components to leave only the one you need to work on */}
        <div className="nnb-app">
          {!showPOIForm && (
            <div>
              <div className="nnb-map-container">
                <NNBMap {...this.state} />
              </div>
              <div className="info-panel-container">
                <InfoPanel {...this.state} />
              </div>
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
