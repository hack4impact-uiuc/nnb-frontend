import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'
import moment from 'moment'

export default class GetPOI extends Component {
  state = { loadPOIBy: '' }

  // Make sure that only numbers can be entered into the text box
  handleTextChange = event => {
    event.target.value.match(/^\d+(\.\d+)?$/)
      ? this.setState({ loadPOIBy: Number(event.target.value) })
      : event.target.value === ''
        ? this.setState({ loadPOIBy: event.target.value })
        : null
  }
  render() {
    const {
      pois,
      loadPOIs,
      loadPOIById,
      loadPOIsByMapYear,
      loadPOIsByStoryId,
      createPOI,
      updatePOI,
      deletePOI
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
          controlId="loadPOIBy"
          label="Enter POI ID, map year, or story ID"
          inputType="text"
          value={this.state.loadPOIBy}
          onChange={this.handleTextChange}
        />
        <Button onClick={loadPOIs}>Get POIs</Button>
        <Button onClick={() => loadPOIById(this.state.loadPOIBy)}>
          Get POI by ID
        </Button>
        <Button onClick={() => loadPOIsByMapYear(this.state.loadPOIBy)}>
          Get POI by Map Year
        </Button>
        <Button onClick={() => loadPOIsByStoryId(this.state.loadPOIBy)}>
          Get POI by Story ID
        </Button>
        <Button onClick={() => createPOI(dummyPoi)}>Add POI (dummy)</Button>
        <Button onClick={() => updatePOI(this.state.loadPOIBy, dummyPoi)}>
          Edit POI (dummy)
        </Button>
        <Button onClick={() => deletePOI(this.state.loadPOIBy)}>
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
