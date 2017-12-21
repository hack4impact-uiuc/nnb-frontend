import React, { Component } from 'react'
import { POIForm, InfoPanel } from './'
import './../styles/App.css'

class POIFormPanel extends Component {
  state = {
    realTimePOI: null
  }

  updatePOI = poi => {
    this.setState({
      realTimePOI: poi
    })
  }

  render() {
    const { setSelectedPOI, setShowPOIForm, loadPOIsForYear } = this.props
    const { realTimePOI } = this.state

    return (
      <div className="nnb-app">
        <div className="poi-form-container">
          <POIForm
            {...this.props}
            setSelectedPOI={setSelectedPOI}
            setShowPOIForm={setShowPOIForm}
            loadPOIsForYear={loadPOIsForYear}
            updatePOI={this.updatePOI}
          />
        </div>
        <div className="info-panel-container">
          <InfoPanel
            {...this.props}
            selectedEvent={realTimePOI}
            isRealTimePOI={true}
            updateMap={this.props.updateMap}
          />
        </div>
      </div>
    )
  }
}

export default POIFormPanel
