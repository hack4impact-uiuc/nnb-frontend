import React, { Component } from 'react'
import classnames from 'classnames'

class POIMarker extends Component {
  constructor(props) {
    super(props)
    this.onPOIClick = this.onPOIClick.bind(this)
  }

  onPOIClick(event) {
    this.props.setSelectedPOI(this.props.id)
  }

  render() {
    const {
      coordinateX,
      coordinateY,
      mapImageWidth,
      mapImageHeight
    } = this.props
    const absoluteXCoordinate = `${coordinateX / 100 * mapImageWidth}px`
    const absoluteYCoordinate = `${coordinateY / 100 * mapImageHeight}px`
    return (
      <div>
        <div
          className={classnames('marker', {
            'marker--selected': this.props.isSelected
          })}
          onClick={this.onPOIClick}
          style={{
            left: absoluteXCoordinate,
            top: absoluteYCoordinate
          }}
        />
      </div>
    )
  }
}

export default POIMarker
