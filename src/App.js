import React, { Component } from 'react'
import { Grid, Navbar } from 'react-bootstrap'
import { InfoPanel, NNBMap, POIForm } from './components'

class App extends Component {
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
          <InfoPanel />
          <NNBMap />
          <POIForm />
        </Grid>
      </div>
    )
  }
}

export default App
