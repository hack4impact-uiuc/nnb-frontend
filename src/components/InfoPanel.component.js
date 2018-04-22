import React, { Component } from 'react'
import { Image, Carousel } from 'react-bootstrap'
import YoutubePlayer from 'react-youtube'
import { Icon } from './'
import './../styles/App.css'
import './../styles/infopanel.css'
import { utils } from './../utils'

import { FieldGroup, LinkTable } from './'

class InfoPanel extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  onClickEdit = () => {
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

  handleSelect(selectedIndex, e) {
    const { modifyPoisCarouselIndex } = this.props
    modifyPoisCarouselIndex(selectedIndex)
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
      setNextPOIInStory,
      setPreviousPOIInStory,
      modifyPOIFormCaption,
      modifyPoisCarouselIndex,
      captions,
      carouselIndex,
      selectedIndex
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
      <Carousel
        activeIndex={selectedIndex}
        onSelect={this.handleSelect}
        interval={null}
      >
        {selectedPOI.media.map((content, index) => {
          const url = content.contentUrl ? content.contentUrl : content
          const width = !!this.infoPanelDiv && this.infoPanelDiv.offsetWidth
          const caption = <p align="center">{content.caption}</p>
          const image = (
            <Image
              width={500}
              height={500}
              alt={shouldShowRealTimePOI ? content : content.caption}
              src={url}
            />
          )
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
                !shouldShowRealTimePOI && (
                  <Icon
                    type="Trash"
                    size="large"
                    className="carousel-item__delete-icon"
                    onClick={() => removePOIFormMedia(content)}
                  />
                )}
              {displayContent}
              <Carousel.Caption />
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

        {!!selectedPOI.media.length && (
          <div>
            <hr />
            <div>{!!selectedPOI.media.length && carousel}</div>
          </div>
        )}

        {!!selectedPOI.media.length &&
          isEditing && (
            <FieldGroup
              inputType="text"
              value={captions}
              onChange={captions =>
                modifyPOIFormCaption(
                  this.state.currentIndex,
                  captions.target.value
                )}
            />
          )}

        {!!selectedPOI.media.length &&
          !isEditing && (
            <div align="center">{selectedPOI.media[carouselIndex].caption}</div>
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
                onClick={setNextPOIInStory}
                disabled={isFirstInStory}
              />
              <h4 className="walkthrough__page-counter">
                {selectedPOIIndex + 1} / {activePOIs.length}
              </h4>
              <Icon
                type="ArrowRight"
                size="large"
                onClick={setPreviousPOIInStory}
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
