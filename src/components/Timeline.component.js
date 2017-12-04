import React, { Component } from 'react'
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

class Timeline extends Component {
  render() {
    const { maps, selectedMap, setSelectedMap } = this.props

    return (
      <div>
        <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            onChange={setSelectedMap}
            name="timeline"
            value={selectedMap && selectedMap.year}
          >
            {maps.map(map => (
              <ToggleButton value={map.year} key={map.year}>
                {map.year}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Timeline
