import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class POIMarker extends Component {
  static propTypes = {
    id: PropTypes.number,
    setSelectedPOI: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
    absoluteXCoordinate: PropTypes.string.isRequired,
    absoluteYCoordinate: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.onPOIClick = this.onPOIClick.bind(this)
  }

  onPOIClick(event) {
    this.props.setSelectedPOI(this.props.id)
  }

  render() {
    const { absoluteXCoordinate, absoluteYCoordinate, isSelected } = this.props
    return (
      <div>
        <div
          className={classnames('marker', {
            'marker--selected': isSelected
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
