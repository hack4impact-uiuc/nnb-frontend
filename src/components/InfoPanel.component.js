import React, { Component } from 'react'
import { Image, Carousel } from 'react-bootstrap'
import YoutubePlayer from 'react-youtube'
import { ROUTES } from './../'
import { Icon } from './'
import './../styles/App.css'
import './../styles/infopanel.css'
import { utils } from './../utils'

import { FieldGroup, LinkTable } from './'

class InfoPanel extends Component {
  onClickEdit = () => {
    this.props.editPOI()
    this.props.history.push(ROUTES.FORM)
  }

  onClickDelete = () => {
    if (window.confirm('Delete POI?')) {
      const { selectedMap, deletePOI, selectedPOIId, loadPOIs } = this.props
      if (selectedMap) {
        deletePOI(selectedPOIId).then(() => loadPOIs())
      }
    }
  }

  // TODO: There is something wrong with the Carousel (assumed Bootstrap Issue)
  // where when you switch POIs, it does not display the 0th item despite the fact
  // that carouselIndex correctly resets to 0.
  // For example, if I am on Carousel item "1" of POI A and I switch to POI B,
  // it will display POI B's Carousel item "1" (as opposed to item 0, which
  // the indicators and carouselIndex prop correctly indicate).
  handleSelect = (carouselIndex, e) => {
    this.props.modifyPoisCarouselIndex(carouselIndex)
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
      removePOIFormMedia,
      setNextPOIInStory,
      setPreviousPOIInStory,
      modifyPOIFormCaption,
      modifyPoisCarouselIndex,
      carouselIndex,
      location
    } = this.props

    const isRealTimePOI = location.pathname === ROUTES.FORM

    if (!selectedPOI) {
      if (isStorySelected) {
        return (
          <div className="info-panel">
            <h1>No POIs In Story</h1>
          </div>
        )
      }
      return (
        <div className="info-panel">
          <h1>No POI Selected</h1>
        </div>
      )
    }

    const { name, date, description, storyIds, media, links } = selectedPOI
    const displayFields = [name, date, description, storyIds, media, links]

    if (
      isRealTimePOI &&
      !displayFields.some(el => (Array.isArray(el) ? !!el.length : !!el))
    ) {
      return (
        <div className="info-panel">
          <h1>Preview Will Appear Here</h1>
        </div>
      )
    }

    const carousel = (
      <Carousel
        activeIndex={carouselIndex}
        onSelect={this.handleSelect}
        interval={null}
        indicators={false}
      >
        {media.map(media => {
          const url = media.contentUrl
          const image = (
            <Image width={500} height={500} alt={media.caption} src={url} />
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
                isRealTimePOI && (
                  <Icon
                    type="Trash"
                    size="large"
                    className="carousel-item__delete-icon"
                    onClick={() => removePOIFormMedia(media)}
                  />
                )}
              {displayContent}
              <Carousel.Caption />
            </Carousel.Item>
          )
        })}
      </Carousel>
    )

    return (
      <div className="info-panel" ref={r => (this.infoPanelDiv = r)}>
        {!!name && (
          <div className="heading">
            <h1 className="heading__name">{name}</h1>
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

        {!!date && (
          <div className="date">
            <p>{date.format('MMMM Do, YYYY')}</p>
          </div>
        )}

        {!!media.length && (
          <div>
            <hr />
            <div>{!!media.length && carousel}</div>
          </div>
        )}

        {!!media.length &&
          isEditing &&
          isRealTimePOI && (
            <FieldGroup
              inputType="text"
              value={media[carouselIndex].caption}
              placeholder="Change Media Caption Here"
              onChange={e =>
                modifyPOIFormCaption(carouselIndex, e.target.value)}
            />
          )}

        {!!media.length &&
          !isRealTimePOI && (
            <div className="caption">
              <div className="caption__text">
                {media[carouselIndex].caption}
              </div>
            </div>
          )}

        {!!description && (
          <div>
            <hr />
            <div className="description">
              <p className="description__text">{description}</p>
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
                  const displayText = link.displayName
                    ? link.displayName
                    : link.url
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
                onClick={setPreviousPOIInStory}
                disabled={isFirstInStory}
              />
              <h4 className="walkthrough__page-counter">
                {selectedPOIIndex + 1} / {activePOIs.length}
              </h4>
              <Icon
                type="ArrowRight"
                size="large"
                onClick={setNextPOIInStory}
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
