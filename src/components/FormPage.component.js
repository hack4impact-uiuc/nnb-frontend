import React, { Component } from 'react'
import { POIFormNew, InfoPanel } from './'
import './../styles/App.css'

class FormPage extends Component {
  render() {
    return (
      <div className="nnb-app">
        <div className="poi-form-container">
          <POIFormNew />
        </div>
        <div className="info-panel-container">
          <InfoPanel />
        </div>
      </div>
    )
  }
}

export default FormPage
