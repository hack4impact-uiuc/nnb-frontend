import React, { Component } from 'react'
import { Image, Carousel } from 'react-bootstrap'
import YoutubePlayer from 'react-youtube'
import { Icon } from './'
import './../styles/App.css'
import './../styles/infopanel.css'
import { utils } from './../utils'

class InfoPanel extends Component {
  // TODO: do this with redux?
  onClickPrevious = () => {
    const { activePOIs, selectedPOI, setSelectedPOI } = this.props
    const curIndex = activePOIs.findIndex(poi => poi.id === selectedPOI.id)
    setSelectedPOI(activePOIs[curIndex - 1])
  }

  // TODO: do this with redux?
  onClickNext = () => {
    const { activePOIs, selectedPOI, setSelectedPOI } = this.props
    const curIndex = activePOIs.findIndex(poi => poi.id === selectedPOI.id)
    setSelectedPOI(activePOIs[curIndex + 1])
  }

  onClickEdit = () => {
    this.props.setIsUpdatingPOI(true)
    this.props.setShowPOIForm(true)

    this.props.enableEditMode()
  }

  onClickDelete = () => {
    if (window.confirm('Delete POI?')) {
      const { selectedMap, deletePOI, selectedPOIId, loadPOIs } = this.props
      if (selectedMap) {
        deletePOI(selectedPOIId).then(() => loadPOIs())
      }
    }
  }

  render() {
    const {
      activePOIs,
      isStorySelected,
      selectedPOIIndex,
      isFirstInStory,
      isLastInStory,
      selectedPOI,
      isEditing,
      shouldShowRealTimePOI,
      removePOIFormMedia,

      showPOIForm
    } = this.props

    if (!selectedPOI) {
      return (
        <div className="info-panel">
          <h1>
            {shouldShowRealTimePOI
              ? 'Preview Will Appear Here'
              : 'No POI Selected'}
          </h1>
        </div>
      )
    }

    const carousel = (
      <Carousel>
        {selectedPOI.content.map(content => {
          const url = content.contentUrl ? content.contentUrl : content
          const image = (
            <Image
              width={500}
              height={500}
              alt={shouldShowRealTimePOI ? content : content.caption}
              src={url}
            />
          )
          const width = !!this.infoPanelDiv && this.infoPanelDiv.offsetWidth
          const youtubePlayer = (
            <YoutubePlayer
              videoId={url}
              opts={{
                [!!width && 'width']: width
              }}
            />
          )
          const displayContent = url.includes('cloudinary')
            ? image
            : youtubePlayer
          return (
            <Carousel.Item key={url} className="carousel-item">
              {isEditing &&
                showPOIForm && (
                  <Icon
                    type="Trash"
                    size="large"
                    className="carousel-item__delete-icon"
                    onClick={() => removePOIFormMedia(content)}
                  />
                )}
              {displayContent}
            </Carousel.Item>
          )
        })}
      </Carousel>
    )

    const links = selectedPOI.links

    return (
      <div className="info-panel" ref={r => (this.infoPanelDiv = r)}>
        {!!selectedPOI.name && (
          <div className="heading">
            <h1 className="heading__name">{selectedPOI.name}</h1>
            {isEditing &&
              !shouldShowRealTimePOI && (
                <Icon
                  type="Edit"
                  size="large"
                  className="story-item__icon"
                  onClick={this.onClickEdit}
                />
              )}
            {isEditing &&
              !shouldShowRealTimePOI && (
                <Icon
                  type="Trash"
                  size="large"
                  className="story-item__icon"
                  onClick={this.onClickDelete}
                />
              )}
          </div>
        )}

        {!!selectedPOI.content.length && (
          <div>
            <hr />
            <div>{!!selectedPOI.content.length && carousel}</div>
          </div>
        )}

        {!!selectedPOI.description && (
          <div>
            <hr />
            <div className="description">
              <p className="description__text">{selectedPOI.description}</p>
            </div>
          </div>
        )}

        {!!links.length && (
          <div>
            <hr />
            <div className="additional-links">
              <h4>Additional Links:</h4>
              <ul className="additional-links__ul">
                {links.map((link, i) => {
                  const displayText = link.urlName ? link.urlName : link.url
                  const validatedLink = utils.validateLink(link.url)
                  return (
                    <li key={link.url + i} className="additional-links__li">
                      <a href={validatedLink} target="new">
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
                disabled={isFirstInStory}
              />
              <h4 className="walkthrough__page-counter">
                {selectedPOIIndex + 1} / {activePOIs.length}
              </h4>
              <Icon
                type="ArrowRight"
                size="large"
                onClick={this.onClickNext}
                disabled={isLastInStory}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default InfoPanel
