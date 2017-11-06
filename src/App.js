import React, { Component } from 'react'
import { Grid, Navbar } from 'react-bootstrap'
import { InfoPanel, NNBMap, POIForm } from './components'
import { pois } from './utils/dummyData'

class App extends Component {
  // using dummy data until BE api is done
  state = {
    activeEvents: pois,
    selectedEvent: pois[0]
  }

  constructor(props) {
    super(props)
    this.onPOIMarkerClick = this.onPOIMarkerClick.bind(this)
  }

  onPOIMarkerClick(POIMarkerId) {
    const clickedPOI = this.state.activeEvents.find(
      POI => POI.id === POIMarkerId
    )
    this.setState({
      selectedEvent: clickedPOI
    })
  }

  render() {
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
        <Grid>
          {/* Comment out the components to leave only the one you need to work on */}
          <InfoPanel {...this.state} />
          <NNBMap {...this.state} onPOIMarkerClick={this.onPOIMarkerClick} />
          <POIForm {...this.state} />
        </Grid>
      </div>
    )
  }
}

export default App
