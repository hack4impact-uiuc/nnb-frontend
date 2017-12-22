import React, { Component } from 'react'
import { Image, Carousel } from 'react-bootstrap'
import { Icon } from './'
import './../styles/App.css'
import './../styles/infopanel.css'
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
      isRealTimePOI
    } = this.props

    if (!selectedEvent) {
      return (
        <div className="info-panel">
          <h1>
            {isRealTimePOI ? 'Preview Will Appear Here' : 'No POI Selected'}
          </h1>
        </div>
      )
    }

    const carousel = (
      <Carousel>
        {selectedEvent.content.map(content => (
          <Carousel.Item key={isRealTimePOI ? content : content.contentUrl}>
            <Image
              width={500}
              height={500}
              alt={isRealTimePOI ? content : content.caption}
              src={isRealTimePOI ? content : content.contentUrl}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    )

    const curIndex = activeEvents.findIndex(poi => poi.id === selectedEvent.id)
    const isShownNext = curIndex < activeEvents.length - 1
    const isShownPrev = curIndex > 0

    let links = selectedEvent.links
    if (links && isRealTimePOI) {
      links = selectedEvent.links.map(linkPair => ({
        url: linkPair[0],
        urlName: linkPair[1]
      }))
    }

    return (
      <div className="info-panel">
        {!!selectedEvent.name && (
          <div className="heading">
            <h1 className="heading__name">{selectedEvent.name}</h1>
            {isEditing &&
              !isRealTimePOI && (
                <Icon
                  type="Edit"
                  size="large"
                  className="story-item__icon"
                  onClick={this.onClickEdit}
                />
              )}
            {isEditing &&
              !isRealTimePOI && (
                <Icon
                  type="Trash"
                  size="large"
                  className="story-item__icon"
                  onClick={this.onClickDelete}
                />
              )}
          </div>
        )}

        {!!selectedEvent.content.length && (
          <div>
            <hr />
            <div>{!!selectedEvent.content.length && carousel}</div>
          </div>
        )}

        {!!selectedEvent.description && (
          <div>
            <hr />
            <div className="description">
              <p className="description__text">{selectedEvent.description}</p>
            </div>
          </div>
        )}

        {links &&
          !!links.length && (
            <div>
              <hr />
              <div className="additional-links">
                <h4>Additional Links:</h4>
                <ul className="additional-links__ul">
                  {links.map(link => {
                    const displayText = link.urlName ? link.urlName : link.url
                    return (
                      <li key={link.url} className="additional-links__li">
                        <a href={link.url} target="new">
                          {displayText}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}

        {isStorySelected && (
          <div className="walkthrough-container">
            <hr />
            <div className="walkthrough">
              <Icon
                type="ArrowLeft"
                size="large"
                onClick={this.onClickPrevious}
                disabled={!isShownPrev}
              />
              <h4 className="walkthrough__page-counter">
                {curIndex + 1} / {activeEvents.length}
              </h4>
              <Icon
                type="ArrowRight"
                size="large"
                onClick={this.onClickNext}
                disabled={!isShownNext}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default InfoPanel
