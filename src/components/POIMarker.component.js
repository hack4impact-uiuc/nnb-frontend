import React, { Component } from 'react'

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
    return (
      <div>
        <div
          className={
            this.props.isSelected ? 'selected-marker' : 'active-marker'
          }
          onClick={this.onPOIClick}
          style={{ left: this.props.coordinateX, top: this.props.coordinateY }}
        />
      </div>
    )
  }
}

export default POIMarker
