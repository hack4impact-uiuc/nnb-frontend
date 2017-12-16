import React, { Component } from 'react'
import { Interval } from '../components'
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import './../styles/timeline.css'

class Timeline extends Component {
  render() {
    const { maps, selectedMap, loadPOIsForYear } = this.props

    return (
      <div className="timeline">
        {maps.map(map => (
          <Interval
            startYear={map.year}
            loadPOIsForYear={loadPOIsForYear}
            numMaps={maps.length}
          />
        ))}
      </div>
    )
  }
}

export default Timeline
