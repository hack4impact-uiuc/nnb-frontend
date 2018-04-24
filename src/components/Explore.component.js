import React, { Component } from 'react'
import { NNBMap, InfoPanel, Timeline } from './'
import './../styles/App.css'

class Explore extends Component {
  render() {
    return (
      <div className="nnb-app">
        <div className="nnb-map-container">
          <NNBMap />
          <Timeline />
        </div>
        <div className="info-panel-container">
          <InfoPanel />
        </div>
      </div>
    )
  }
}

export default Explore
