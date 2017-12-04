import React, { Component } from 'react'
import { Image, Button, Carousel } from 'react-bootstrap'
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
    const IMAGE_URL_1 =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Travis_Scott_April_2017.jpg/1200px-Travis_Scott_April_2017.jpg'
    const IMAGE_URL_2 =
      'https://media.pitchfork.com/photos/592993405e6ef9596931ee5e/1:1/w_300/ebab43f0.jpg'
    const IMAGE_URL_3 = 'https://assets.rbl.ms/8276008/980x.jpg'
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
        <Carousel.Item>
          <Image width={900} height={500} alt="900x500" src={IMAGE_URL_1} />
          <Carousel.Caption>
            <p>Travis Scott 1</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={900} height={500} alt="900x500" src={IMAGE_URL_2} />
          <Carousel.Caption>
            <p>Travis Scott 2</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={900} height={500} alt="900x500" src={IMAGE_URL_3} />
          <Carousel.Caption>
            <p>Travis Scott 3</p>
          </Carousel.Caption>
        </Carousel.Item>
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
