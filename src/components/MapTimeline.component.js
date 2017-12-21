import React, { Component } from 'react'
import { NNBMap, MapManager, Timeline, InfoPanel } from './'
import './../styles/App.css'

class MapTimeline extends Component {
  render() {
    const {
      selectedEvent,
      isEditing,
      setSelectedPOI,
      setShowPOIForm,
      setClickedCoords,
      loadMaps,
      deleteMap,
      loadPOIsForYear
    } = this.props
    return (
      <div className="nnb-app">
        <div className="nnb-map-container">
          <div>
            <NNBMap
              {...this.props}
              setSelectedPOI={setSelectedPOI}
              setShowPOIForm={setShowPOIForm}
              setClickedCoords={setClickedCoords}
            />
          </div>
          {isEditing && (
            <MapManager
              {...this.props}
              loadMaps={loadMaps}
              deleteMap={deleteMap}
            />
          )}
          <div className="timeline-container">
            <Timeline {...this.props} loadPOIsForYear={loadPOIsForYear} />
          </div>
        </div>
        <div className="info-panel-container">
          <InfoPanel
            {...this.props}
            setSelectedPOI={setSelectedPOI}
            loadPOIsForYear={loadPOIsForYear}
            selectedEvent={selectedEvent}
            updateMap={this.props.updateMap}
          />
        </div>
      </div>
    )
  }
}

export default MapTimeline
