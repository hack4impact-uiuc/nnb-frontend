import React, { Component } from 'react'
import classnames from 'classnames'

class POIMarker extends Component {
  render() {
    const {
      absoluteXCoordinate,
      absoluteYCoordinate,
      isSelected,
      isPreviewed,
      setAsActivePOI,
      setAsPreviewPOI,
      clearPreviewPOI
    } = this.props
    return (
      <div>
        <div
          className={classnames('marker', {
            'marker--selected': isSelected,
            'marker--previewed': !isSelected && isPreviewed
          })}
          onClick={setAsActivePOI}
          onMouseOver={setAsPreviewPOI}
          onMouseOut={clearPreviewPOI}
          style={{
            left: `${absoluteXCoordinate}px`,
            top: `${absoluteYCoordinate}px`
          }}
        />
      </div>
    )
  }
}

export default POIMarker
