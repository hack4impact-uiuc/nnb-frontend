import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Image, Button } from 'react-bootstrap'
import './../styles/map.css'
import { POIMarker } from '../components'

//const IMAGE_URL = 'http://www.vectorstash.com/vectors/vectorstash-grid.svg'
const IMAGE_URL =
  'http://www.citymetric.com/sites/default/files/styles/nodeimage/public/article_2016/11/head.png?itok=VpwDz-7X'

class NNBMap extends Component {
  state = {
    scaledCoords: [0, 0],
    mapImageLoaded: false,
    isChoosingNewPOICoords: false
  }

  constructor(props) {
    super(props)
    this.onImageClick = this.onImageClick.bind(this)
    this.mapImageLoaded = this.mapImageLoaded.bind(this)
    this.startAddPOIFlow = this.startAddPOIFlow.bind(this)
    this.cancelAddPOIFlow = this.cancelAddPOIFlow.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditing === false) {
      this.setState({ isChoosingNewPOICoords: false })
    }
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

  mapImageLoaded() {
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

  render() {
    const {
      mapImageLoaded,
      mapImageWidth,
      mapImageHeight,
      isChoosingNewPOICoords
    } = this.state

    return (
      <div>
        <div className="image-container">
          <Image
            src={IMAGE_URL}
            responsive
            ref={el => (this.image = el)}
            onClick={this.onImageClick}
            onLoad={this.mapImageLoaded}
          />
          {mapImageLoaded && (
            <POIMarkers
              {...this.props}
              {...{ mapImageWidth, mapImageHeight }}
            />
          )}
        </div>
        {this.props.isEditing && (
          <Button
            onClick={
              isChoosingNewPOICoords
                ? this.cancelAddPOIFlow
                : this.startAddPOIFlow
            }
          >
            {isChoosingNewPOICoords ? 'Cancel' : 'Add POI'}
          </Button>
        )}
        {this.props.isEditing &&
          isChoosingNewPOICoords && (
            <div>Click on the map to set a location for the new POI.</div>
          )}
      </div>
    )
  }
}

function POIMarkers({
  activeEvents,
  selectedEvent,
  setSelectedPOI,
  mapImageWidth,
  mapImageHeight
}) {
  return activeEvents.map(POI => (
    <POIMarker
      {...POI}
      isSelected={POI.id === selectedEvent.id}
      key={POI.id}
      {...{ setSelectedPOI, mapImageWidth, mapImageHeight }}
    />
  ))
}

export default NNBMap
