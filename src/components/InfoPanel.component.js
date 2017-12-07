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
    //<--TODO: Add functionality - bring up add poi form
  }

  onClickDelete() {
    //<--TODO: Add functionality - deletes poi with message
  }

  render() {
    const {
      activeEvents,
      selectedEvent,
      setSelectedPOI,
      isStorySelected,
      isEditing
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
        {isEditing && (
          <a className="btn btn-primary a-btn-slide-text">
            <span
              className="glyphicon glyphicon-edit"
              onClick={this.onClickEdit}
            />
            Edit
          </a>
        )}
        <a className="btn btn-primary a-btn-slide-text">
          <span
            className="glyphicon glyphicon-remove"
            onClick={this.onClickDelete}
          />
          Delete
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
