import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'

export default class GetPOI extends Component {
  state = { getPoiBy: '' }
  handleTextChange = event => {
    event.target.value.match(/^\d+(\.\d+)?$/) || event.target.value === ''
      ? this.setState({ getPoiBy: event.target.value })
      : null
  }
  render() {
    const {
      pois,
      getPois,
      getPoiById,
      getPoiByMapYear,
      getPoiByStoryId
    } = this.props
    return (
      <div>
        {pois}
        <FieldGroup
          controlId="getPoiBy"
          label="Enter POI ID, map year, or story ID"
          inputType="text"
          value={this.state.getPoiBy}
          onChange={this.handleTextChange}
        />
        <Button onClick={getPois}>Get POIs</Button>
        <Button onClick={() => getPoiById(this.state.getPoiBy)}>
          Get POI by ID
        </Button>
        <Button onClick={() => getPoiByMapYear(this.state.getPoiBy)}>
          Get POI by Map Year
        </Button>
        <Button onClick={() => getPoiByStoryId(this.state.getPoiBy)}>
          Get POI by Story ID
        </Button>
      </div>
    )
  }
}
