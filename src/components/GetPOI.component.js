import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'
import moment from 'moment'

export default class GetPOI extends Component {
  state = { getPoiBy: '' }

  // Make sure that only numbers can be entered into the text box
  handleTextChange = event => {
    event.target.value.match(/^\d+(\.\d+)?$/)
      ? this.setState({ getPoiBy: Number(event.target.value) })
      : event.target.value === ''
        ? this.setState({ getPoiBy: event.target.value })
        : null
  }
  render() {
    const {
      pois,
      getPois,
      getPoiById,
      getPoisByMapYear,
      getPoisByStoryId,
      postPoi,
      putPoi,
      deletePoi
    } = this.props
    const dummyPoi = {
      name: 'Rick Astley',
      description: 'Never Gonna Give You Up',
      date: moment('1987-07-27'),
      mapByYear: 1987,
      coordinateX: 7,
      coordinateY: 27,
      links: [
        {
          url: 'https://www.youtube.com/watch?v=ghGoI7xVtSI',
          urlName: 'Greatest Hits Live'
        }
      ],
      content: [
        {
          contentUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          caption: 'Greatest Hits'
        }
      ]
    }
    return (
      <div>
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
        <Button onClick={() => getPoisByMapYear(this.state.getPoiBy)}>
          Get POI by Map Year
        </Button>
        <Button onClick={() => getPoisByStoryId(this.state.getPoiBy)}>
          Get POI by Story ID
        </Button>
        <Button onClick={() => postPoi(dummyPoi)}>Add POI (dummy)</Button>
        <Button onClick={() => putPoi(this.state.getPoiBy, dummyPoi)}>
          Edit POI (dummy)
        </Button>
        <Button onClick={() => deletePoi(this.state.getPoiBy)}>
          Delete POI by ID
        </Button>
        <br />
        <br />
        {pois.activePOIs.map(poi => (
          <li>
            ID {poi.id}: {poi.name}
          </li>
        ))}
      </div>
    )
  }
}
