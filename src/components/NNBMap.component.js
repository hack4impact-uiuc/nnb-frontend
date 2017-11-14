import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Image } from 'react-bootstrap'
import './../styles/map.css'
import { POIMarker } from '../components'

//const IMAGE_URL = 'http://www.vectorstash.com/vectors/vectorstash-grid.svg'
const IMAGE_URL =
  'http://www.citymetric.com/sites/default/files/styles/nodeimage/public/article_2016/11/head.png?itok=VpwDz-7X'

class NNBMap extends Component {
  state = {
    scaledCoords: [0, 0],
    mapImageLoaded: false
  }

  constructor(props) {
    super(props)
    this.onImageClick = this.onImageClick.bind(this)
    this.mapImageLoaded = this.mapImageLoaded.bind(this)
  }

  onImageClick(event) {
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
      scaledCoords
    })
  }

  mapImageLoaded() {
    const mapImageElement = ReactDOM.findDOMNode(this.image)
    this.setState({
      mapImageLoaded: true,
      mapImageWidth: mapImageElement.width,
      mapImageHeight: mapImageElement.height
    })
  }

  render() {
    const { scaledCoords, mapImageWidth, mapImageHeight } = this.state
    const [x, y] = scaledCoords

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
          {this.state.mapImageLoaded && (
            <POIMarkers
              {...this.props}
              {...{ mapImageWidth, mapImageHeight }}
            />
          )}
        </div>
        <div>
          x: {x}
          <br />
          y: {y}
        </div>
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
  return activeEvents.map(poi => {
    const absoluteXCoordinate = `${poi.coordinateX / 100 * mapImageWidth}px`
    const absoluteYCoordinate = `${poi.coordinateY / 100 * mapImageHeight}px`

    return (
      <POIMarker
        {...poi}
        isSelected={poi.id === selectedEvent.id}
        key={poi.id}
        {...{ setSelectedPOI, absoluteXCoordinate, absoluteYCoordinate }}
      />
    )
  })
}

export default NNBMap
