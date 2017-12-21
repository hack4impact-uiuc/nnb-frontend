import React, { Component } from 'react'
import { Image, Button, Carousel } from 'react-bootstrap'
import './../styles/App.css'
import { Api } from './../utils'

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
    const { selectedEvent, loadPOIsForYear, selectedMap } = this.props
    if (selectedMap) {
      Api.deletePOI(selectedEvent.id).then(() =>
        loadPOIsForYear(selectedMap.year)
      )
    }
    //<--TODO: Add functionality - deletes poi with message
  }

  render() {
    const {
      activeEvents,
      selectedEvent,
      isEditing,
      isStorySelected,
      realTimePOI
    } = this.props

    if (!selectedEvent) {
      return (
        <div className="info-panel">
          <h1>No POI Selected</h1>
        </div>
      )
    }

    const carousel = (
      <Carousel>
        {selectedEvent.content.map(content => (
          <Carousel.Item key={content.contentUrl}>
            <Image
              width={500}
              height={500}
              alt={content.caption}
              src={content.contentUrl}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    )

    const curIndex = activeEvents.findIndex(poi => poi.id === selectedEvent.id)
    const isShownNext = curIndex < activeEvents.length - 1
    const isShownPrev = curIndex > 0

    return (
      <div className="info-panel">
        {isEditing &&
          !realTimePOI && (
            <div className="btn btn-primary a-btn-slide-text">
              <span
                className="glyphicon glyphicon-edit"
                onClick={this.onClickEdit}
              >
                Edit
              </span>
            </div>
          )}
        {isEditing &&
          !realTimePOI && (
            <div className="btn btn-primary a-btn-slide-text">
              <span
                className="glyphicon glyphicon-remove"
                onClick={this.onClickDelete}
              >
                Delete
              </span>
            </div>
          )}
        <h1>
          <u>
            <b>{selectedEvent.name} </b>
          </u>
        </h1>
        <div>
          <div>
            {carousel}
            <hr />
            <h3>Description:</h3>
            <p>{selectedEvent.description}</p>
            <hr />
            {selectedEvent.links &&
              selectedEvent.links.length && (
                <div>
                  <h3>Additional Links:</h3>
                  <ul>
                    {selectedEvent.links.map(link => {
                      const displayText = link.urlName ? link.urlName : link.url
                      return (
                        <li key={link.url}>
                          <a href={link.url}>{displayText}</a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            {isStorySelected && (
              <h4>
                POI: {curIndex + 1}/{activeEvents.length}
              </h4>
            )}
            {isStorySelected &&
              isShownPrev && (
                <Button bsStyle="primary" onClick={this.onClickPrevious}>
                  Previous
                </Button>
              )}
            {isStorySelected &&
              isShownNext && (
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
