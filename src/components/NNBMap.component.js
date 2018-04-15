import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Image } from 'react-bootstrap'
import { MapInteraction } from 'react-map-interaction'
import { POIMarker, Icon } from '../components'
import './../styles/map.css'

class NNBMap extends Component {
  state = {
    scaledCoords: [0, 0],
    mapImageLoaded: false,
    isChoosingNewPOICoords: false,
    initialScale: 1.0,
    mapSetStartPosition: false
  }

  constructor(props) {
    super(props)
    this.onImageClick = this.onImageClick.bind(this)
    this.updateMapImageDimensions = this.updateMapImageDimensions.bind(this)
    this.startAddPOIFlow = this.startAddPOIFlow.bind(this)
    this.cancelAddPOIFlow = this.cancelAddPOIFlow.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.showConfirmDeleteMap = this.showConfirmDeleteMap.bind(this)
    this.clampCoordinates = this.clampCoordinates.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { selectedMap } = this.props
    if (nextProps.isEditing === false) {
      this.setState({ isChoosingNewPOICoords: false })
    }
    if (
      selectedMap &&
      nextProps.selectedMap &&
      nextProps.selectedMap.imageUrl !== selectedMap.imageUrl &&
      nextProps.selectedMap.year !== selectedMap.year
    ) {
      this.setState({ mapImageLoaded: false })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, false)
  }

  onImageScroll = scale => {
    this.setState({
      scale
    })
  }

  onImageClick(event, scale) {
    if (this.state.isChoosingNewPOICoords) {
      const element = ReactDOM.findDOMNode(this.image)
      const domRect = element.getBoundingClientRect()

      const imageDisplayedResolution = [
        element.width * scale,
        element.height * scale
      ]

      const mouseClickCoords = [
        event.clientX - domRect.left,
        event.clientY - domRect.top
      ]

      // clicked coords scaled to 0 - 100
      const scaledCoords = mouseClickCoords.map(
        (e, i) => 100 * e / imageDisplayedResolution[i]
      )
      this.setState({
        scaledCoords,
        isChoosingNewPOICoords: false
      })
      this.props.setClickedCoords(scaledCoords)
      this.props.setShowPOIForm(true)
    }
  }

  onWindowResize() {
    this.setState({ mapImageLoaded: false }, () =>
      this.updateMapImageDimensions(this.containerNode)
    )
  }

  updateMapImageDimensions(containerNode, setTranslationScale) {
    const mapImageElement = ReactDOM.findDOMNode(this.image)
    const imageWidth = mapImageElement.width
    const imageHeight = mapImageElement.height
    if (this.image) {
      this.setState({
        mapImageLoaded: true,
        mapImageWidth: imageWidth,
        mapImageHeight: imageHeight,
        mapSetStartPosition: false
      })
    }
    if (containerNode) {
      const boundingWidth = containerNode.clientWidth
      const boundingHeight = containerNode.clientHeight
      const scaleX = boundingWidth > imageWidth ? boundingWidth / imageWidth : 1
      const scaleY =
        boundingHeight > imageHeight ? boundingHeight / imageHeight : 1
      const initialScale = Math.max(scaleX, scaleY)
      const initialX = (boundingWidth - imageWidth * initialScale) / 2
      const initialY = (boundingHeight - imageHeight * initialScale) / 2
      this.setState(
        {
          boundingWidth,
          boundingHeight,
          initialScale,
          initialX,
          initialY
        },
        () => {
          if (setTranslationScale) {
            setTranslationScale({ x: initialX, y: initialY }, initialScale)
          }
        }
      )
    }
  }

  clampCoordinates(translationDirection, scale, boundingSize, mapSize) {
    // translation.x =
    //   translation.x > 0
    //     ? 0
    //     : (boundingWidth + Math.abs(translation.x)) / scale >
    //       mapImageWidth
    //       ? (mapImageWidth * scale - boundingWidth) * -1
    //       : translation.x
    if (translationDirection > 0) {
      return 0
    } else if (
      (boundingSize + Math.abs(translationDirection)) / scale >
      mapSize
    ) {
      return (mapSize * scale - boundingSize) * -1
    }
    return translationDirection
  }

  startAddPOIFlow() {
    this.setState({
      isChoosingNewPOICoords: true
    })
  }

  cancelAddPOIFlow() {
    this.setState({
      isChoosingNewPOICoords: false
    })
  }

  showConfirmDeleteMap() {
    if (
      window.confirm(
        'Delete the current map? This will also delete all POIs associated with this map.'
      )
    ) {
      this.props.deleteMap(this.props.selectedMap.id)
    }
  }

  render() {
    const {
      mapImageLoaded,
      mapImageWidth,
      mapImageHeight,
      mapSetStartPosition,
      boundingWidth,
      boundingHeight,
      initialX,
      initialY,
      initialScale,
      isChoosingNewPOICoords
    } = this.state

    const { selectedMap, isEditing } = this.props

    return (
      <div>
        {!selectedMap && <h1 style={{ padding: '3rem' }}>No Map Selected</h1>}
        {selectedMap && (
          <div className="map-container">
            {isEditing && (
              <div className="map-icons">
                {!isChoosingNewPOICoords && (
                  <Icon
                    type="Plus"
                    size="large"
                    className="map-icon map-icon__box"
                    onClick={this.startAddPOIFlow}
                  />
                )}
                {isChoosingNewPOICoords && (
                  <Icon
                    type="X"
                    size="large"
                    className="map-icon map-icon__box"
                    onClick={this.cancelAddPOIFlow}
                  />
                )}
                <Icon
                  type="Trash2"
                  size="large"
                  className="map-icon map-icon__box"
                  onClick={this.showConfirmDeleteMap}
                />
              </div>
            )}
            {isEditing &&
              isChoosingNewPOICoords && (
                <div className="map-banner">
                  Click on the map to set a location for the new POI.
                </div>
              )}
            <MapInteraction
              minScale={initialScale}
              maxScale={2}
              initialScale={initialScale}
              initialX={initialX}
              initialY={initialY}
            >
              {({ translation, scale }, setTranslationScale) => {
                if (this.containerNode) {
                  translation.x = this.clampCoordinates(
                    translation.x,
                    scale,
                    boundingWidth,
                    mapImageWidth
                  )
                  translation.y = this.clampCoordinates(
                    translation.y,
                    scale,
                    boundingHeight,
                    mapImageHeight
                  )
                }
                const transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`
                return (
                  <div>
                    <div
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '10px',
                        zIndex: '1',
                        width: '50px',
                        height: '25px',
                        border: '3px solid DodgerBlue',
                        background: 'white',
                        margin: '3px'
                      }}
                    >
                      <div align="center">{Math.floor(scale * 100)}%</div>
                    </div>
                    <div
                      ref={node => (this.containerNode = node)}
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'relative', // for absolutely positioned children
                        overflow: 'hidden',
                        touchAction: 'none', // Not supported in Safari :(
                        msTouchAction: 'none',
                        cursor: 'all-scroll',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                      }}
                    >
                      <div
                        style={{
                          transform: transform,
                          transformOrigin: '0 0 '
                        }}
                      >
                        {
                          <Image
                            src={selectedMap.imageUrl}
                            className="image-fill map-image"
                            ref={el => (this.image = el)}
                            onClick={event => this.onImageClick(event, scale)}
                            onLoad={() =>
                              this.updateMapImageDimensions(
                                this.containerNode,
                                setTranslationScale
                              )}
                            draggable="false"
                          />
                        }
                        {mapImageLoaded && (
                          <POIMarkers
                            {...this.props}
                            {...{
                              mapImageWidth: mapImageWidth,
                              mapImageHeight: mapImageHeight
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              }}
            </MapInteraction>
          </div>
        )}
      </div>
    )
  }
}

function POIMarkers({
  activeEvents,
  selectedEvent,
  setSelectedPOI,
  selectedMap,
  mapImageWidth,
  mapImageHeight
}) {
  const displayEvents = activeEvents.filter(
    poi => poi.mapByYear === selectedMap.year
  )

  return displayEvents.map(poi => (
    <POIMarker
      {...poi}
      isSelected={selectedEvent && poi.id === selectedEvent.id}
      key={poi.id}
      {...{ setSelectedPOI, mapImageWidth, mapImageHeight }}
    />
  ))
}

export default NNBMap
