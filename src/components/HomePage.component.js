import React, { Component } from 'react'
import { NNBMap, InfoPanel } from './'

class HomePage extends Component {
  render() {
    return (
      <div>
        <NNBMap />
        <InfoPanel />
      </div>
    )
  }
}

export default HomePage
