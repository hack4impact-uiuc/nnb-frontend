import React, { Component } from 'react'
import { Image, Button, Carousel } from 'react-bootstrap'
import './../styles/App.css'

class InfoPanel extends Component {
  constructor(props) {
    super(props)
    this.onClickPrevious = this.onClickPrevious.bind(this)
    this.onClickNext = this.onClickNext.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
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

  onClickEdit() {
    const { activeEvents, selectedEvent, setSelectedPOI } = this.props
    //<--TODO: Add functionality - bring up add poi form
  }

  onClickDelete() {
    const { activeEvents, selectedEvent, setSelectedPOI } = this.props
    //<--TODO: Add functionality - deletes poi with message
  }

  render() {
    const {
      activeEvents,
      selectedEvent,
      setSelectedPOI,
      isStorySelected
    } = this.props
    const curIndex = activeEvents.findIndex(poi => poi.id === selectedEvent.id)
    const isShownNext = curIndex < activeEvents.length - 1
    const isShownPrev = curIndex > 0

    const carousel = (
      <Carousel>
        {activeEvents.map(selectedEvent => (
          <Carousel.Item>
            <Image
              width={500}
              height={500}
              alt={selectedEvent.caption}
              src={selectedEvent.content_url}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    )

    if (!selectedEvent) {
      return (
        <div className="info-panel">
          <h1>No POI Selected</h1>
        </div>
      )
    }

    return (
      <div className="info-panel">
        <a class="btn btn-primary a-btn-slide-text">
          <span class="glyphicon glyphicon-edit" onClick={this.onClickEdit} />
          <span>
            <strong>Edit</strong>
          </span>
        </a>
        <a class="btn btn-primary a-btn-slide-text">
          <span
            class="glyphicon glyphicon-remove"
            onClick={this.onClickDelete}
          />
          <span>
            <strong>Delete</strong>
          </span>
        </a>

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
            {carousel}
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
            <h4>
              POI: {curIndex + 1}/{activeEvents.length}
            </h4>
            {isShownPrev && (
              <Button bsStyle="primary" onClick={this.onClickPrevious}>
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
