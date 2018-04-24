import React, { Component } from 'react'
import { StoryList, NNBMap, InfoPanel, Timeline } from './'
import './../styles/App.css'

class Explore extends Component {
  render() {
    return (
      <div className="nnb-app">
        <StoryList />
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
