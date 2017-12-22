import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Image, Button } from 'react-bootstrap'
import './../styles/map.css'
import { POIMarker, Icon } from '../components'

class NNBMap extends Component {
  state = {
    scaledCoords: [0, 0],
    mapImageLoaded: false,
    isChoosingNewPOICoords: false
  }

  constructor(props) {
    super(props)
    this.onImageClick = this.onImageClick.bind(this)
    this.updateMapImageDimensions = this.updateMapImageDimensions.bind(this)
    this.startAddPOIFlow = this.startAddPOIFlow.bind(this)
    this.cancelAddPOIFlow = this.cancelAddPOIFlow.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.showConfirmDeleteMap = this.showConfirmDeleteMap.bind(this)
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

  onImageClick(event) {
    if (this.state.isChoosingNewPOICoords) {
      const element = ReactDOM.findDOMNode(this.image)
      const domRect = element.getBoundingClientRect()
      const imageDisplayedResolution = [element.width, element.height]
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
    this.updateMapImageDimensions()
  }

  updateMapImageDimensions() {
    const mapImageElement = ReactDOM.findDOMNode(this.image)
    this.setState({
      mapImageLoaded: true,
      mapImageWidth: mapImageElement.width,
      mapImageHeight: mapImageElement.height
    })
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
      isChoosingNewPOICoords
    } = this.state

    const { selectedMap, isEditing } = this.props

    return (
      <div>
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
            <Image
              src={selectedMap.imageUrl}
              className="image-fill map-image"
              responsive
              ref={el => (this.image = el)}
              onClick={this.onImageClick}
              onLoad={this.updateMapImageDimensions}
            />
            {mapImageLoaded && (
              <POIMarkers
                {...this.props}
                {...{ mapImageWidth, mapImageHeight }}
              />
            )}
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
