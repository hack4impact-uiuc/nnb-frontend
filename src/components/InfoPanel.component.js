import React, { Component } from 'react'
import { Image, Button } from 'react-bootstrap'
import './../styles/App.css'

class InfoPanel extends Component {
  constructor(props) {
    super(props)
    this.onClickPrevious = this.onClickPrevious.bind(this)
    this.onClickNext = this.onClickNext.bind(this)
  }

  onClickPrevious() {
    const { activeEvents, selectedEvent, setSelectedPOI } = this.props
    const curIndex = activeEvents.findIndex(poi => poi.id === selectedEvent.id)
    setSelectedPOI(activeEvents[curIndex - 1].id)
  }

  onClickNext() {
    const { activeEvents, selectedEvent, setSelectedPOI } = this.props
    const curIndex = activeEvents.findIndex(poi => poi.id === selectedEvent.id)
    setSelectedPOI(activeEvents[curIndex + 1].id)
  }

  render() {
    const { activeEvents, selectedEvent, setSelectedPOI } = this.props
    const curIndex = activeEvents.findIndex(poi => poi.id === selectedEvent.id)
    const isShownNext = curIndex < activeEvents.length
    const isShownPrev = curIndex > 0

    return (
      <div className="info-panel">
        <h1>
          <u>
            <b>{selectedEvent.title} </b>
          </u>
        </h1>
        <div>
          <div>
            <Image
              src={selectedEvent.image}
              alt={selectedEvent.title}
              responsive
            />
            <hr />
            <h3>Description:</h3>
            <p>{selectedEvent.description}</p>
            <hr />
            <h3>Additional Links:</h3>
            <ul>
              {selectedEvent.links.map(link => (
                <li key={link}>
                  <a href={link}>{link}</a>
                </li>
              ))}
            </ul>
            {isShownPrev && (
              <Button
                bsStyle="primary"
                type="previous"
                onClick={this.onClickPrevious}
              >
                Previous
              </Button>
            )}
            {isShownNext && (
              <Button bsStyle="primary" onClick={this.onClickNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPanel
