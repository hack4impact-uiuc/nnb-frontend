import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Image } from 'react-bootstrap'
import { MapInteraction } from 'react-map-interaction'
import { POIMarker, Icon, ZoomBanner } from '../components'
import { ROUTES } from './../'
import './../styles/map.css'

class NNBMap extends Component {
  state = {
    scaledCoords: [0, 0],
    mapImageLoaded: false,
    isChoosingNewPOICoords: false,
    minScale: 1.0
  }

  componentWillReceiveProps = nextProps => {
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

  componentDidMount = () => {
    window.addEventListener('resize', this.onWindowResize, false)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onWindowResize, false)
  }

  onImageClick = (event, scale) => {
    const { createNewPOI, history, selectedMap } = this.props

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

      createNewPOI(selectedMap.year, ...scaledCoords)
      history.push(ROUTES.FORM)
    }
  }

  onWindowResize = () => {
    this.updateMapImageDimensions()
  }

  updateMapImageDimensions = () => {
    const mapImageElement = ReactDOM.findDOMNode(this.image)
    const mapImageWidth = mapImageElement.width
    const mapImageHeight = mapImageElement.height
    if (this.image) {
      this.setState({
        mapImageLoaded: true,
        mapImageWidth,
        mapImageHeight
      })
    }
    if (this.containerNode) {
      const boundingWidth = this.containerNode.clientWidth
      const boundingHeight = this.containerNode.clientHeight
      const scaleX =
        boundingWidth > mapImageWidth ? boundingWidth / mapImageWidth : 1
      const scaleY =
        boundingHeight > mapImageHeight ? boundingHeight / mapImageHeight : 1
      const minScale = Math.max(scaleX, scaleY)
      const initialX = (boundingWidth - mapImageWidth * minScale) / 2
      const initialY = (boundingHeight - mapImageHeight * minScale) / 2
      this.setState(
        {
          boundingWidth,
          boundingHeight,
          minScale
        },
        () => {
          if (this.setTranslationScale) {
            this.setTranslationScale({ x: initialX, y: initialY }, minScale)
          }
        }
      )
    }
  }

  clampCoordinates = (translationDirection, scale, boundingSize, mapSize) => {
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

  startAddPOIFlow = () => {
    this.setState({
      isChoosingNewPOICoords: true
    })
  }

  cancelAddPOIFlow = () => {
    this.setState({
      isChoosingNewPOICoords: false
    })
  }

  showConfirmDeleteMap = () => {
    if (
      window.confirm(
        'Delete the current map? This will also delete all POIs associated with this map.'
      )
    ) {
      const {
        deleteMap,
        selectedMap,
        loadMaps,
        activePOIs,
        selectedPOIId,
        setSelectedPOI,
        loadPOIs,
        authorizationToken
      } = this.props
      const selectedPOI = activePOIs.find(poi => poi.id === selectedPOIId)

      // explicity call this since the payload for MAP_DELETED only includes the map id
      // but the pois only contain the map year.
      // therefore we can't tell if the poi is on that map
      // ideally all this should be reactive but it would require changing the api and db schema...
      if (selectedPOI && selectedMap.year === selectedPOI.mapYear) {
        setSelectedPOI({ id: null })
      }

      deleteMap(selectedMap.id, authorizationToken)
        .then(() => loadMaps())
        .then(() => loadPOIs())
    }
  }

  render() {
    const {
      mapImageLoaded,
      mapImageWidth,
      mapImageHeight,
      boundingWidth,
      boundingHeight,
      minScale,
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
              minScale={minScale}
              maxScale={minScale * 2}
              showControls={true}
            >
              {({ translation, scale }, setTranslationScale) => {
                this.setTranslationScale = setTranslationScale
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
                  <div
                    className="map-pan-zoom-container"
                    ref={node => (this.containerNode = node)}
                  >
                    <ZoomBanner scale={Math.floor(scale / minScale * 100)} />
                    <div
                      className="map-transform"
                      style={{
                        transform
                      }}
                    >
                      {
                        <Image
                          src={selectedMap.imageUrl}
                          className="image-fill map-image"
                          ref={el => (this.image = el)}
                          onClick={event => this.onImageClick(event, scale)}
                          onLoad={this.updateMapImageDimensions}
                          draggable="false"
                        />
                      }
                      {mapImageLoaded && (
                        <POIMarkers
                          {...this.props}
                          {...{
                            mapImageWidth,
                            mapImageHeight
                          }}
                        />
                      )}
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
  activePOIs,
  setSelectedPOI,
  mapImageWidth,
  mapImageHeight,
  selectedPOIId,
  selectedMap
}) {
  return activePOIs
    .filter(poi => poi.mapYear === selectedMap.year)
    .map(poi => (
      <POIMarker
        key={poi.id}
        isSelected={poi.id === selectedPOIId}
        absoluteXCoordinate={poi.xCoord / 100 * mapImageWidth}
        absoluteYCoordinate={poi.yCoord / 100 * mapImageHeight}
        setAsActivePOI={() => setSelectedPOI(poi)}
      />
    ))
}

export default NNBMap
