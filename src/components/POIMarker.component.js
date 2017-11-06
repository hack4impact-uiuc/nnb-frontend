import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class POIMarker extends Component {
  constructor(props) {
    super(props)
    this.onPOIClick = this.onPOIClick.bind(this)
  }

  onPOIClick(event) {
    // Modify the App's state: set selectedEvent to be this POI
    this.props.onPOIMarkerClick(this.props.id)
  }

  render() {
    const xC = `${this.props.coordinateX / 100 * this.props.mapImageWidth}px`
    const yC = `${this.props.coordinateY / 100 * this.props.mapImageHeight}px`
    return (
      <div>
        <div
          className={
            this.props.isSelected ? 'selected-marker' : 'active-marker'
          }
          onClick={this.onPOIClick}
          style={{
            left: xC,
            top: yC
          }}
        />
      </div>
    )
  }
}

export default POIMarker
