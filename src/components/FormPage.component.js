import React, { Component } from 'react'
import { POIForm, InfoPanel } from './'
import { Redirect } from 'react-router'
import './../styles/App.css'

class FormPage extends Component {
  render() {
    const { isLoggedIn } = this.props
    return !isLoggedIn ? (
      <Redirect to="/login" />
    ) : (
      <div className="nnb-app">
        <div className="poi-form-container">
          <POIForm />
        </div>
        <div className="info-panel-container">
          <InfoPanel />
        </div>
      </div>
    )
  }
}

export default FormPage
