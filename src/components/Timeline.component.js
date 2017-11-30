import React, { Component } from 'react'
import {
  Button,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.showMapForm = this.showMapForm.bind(this)
  }

  showMapForm() {
    this.props.setShowMapForm(true)
  }

  render() {
    const { maps, selectedMapUrl, setSelectedMap } = this.props

    return (
      <div>
        {this.props.isEditing && (
          <Button onClick={this.showMapForm}>Add Map</Button>
        )}
        <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            onChange={setSelectedMap}
            name="timeline"
            defaultValue={selectedMapUrl}
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
