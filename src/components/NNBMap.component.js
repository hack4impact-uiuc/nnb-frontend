import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Image } from 'react-bootstrap'
import './../styles/map.css'
import { POIMarker } from '../components'

const IMAGE_URL = 'http://www.vectorstash.com/vectors/vectorstash-grid.svg'
// const IMAGE_URL = 'http://www.citymetric.com/sites/default/files/styles/nodeimage/public/article_2016/11/head.png?itok=VpwDz-7X'

class NNBMap extends Component {
  state = {
    scaledCoords: [0, 0]
  }

  constructor(props) {
    super(props)
    this.onImageClick = this.onImageClick.bind(this)
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

  render() {
    const [x, y] = this.state.scaledCoords

    return (
      <div>
        <div className="image-container">
          <Image
            src={IMAGE_URL}
            responsive
            ref={el => (this.image = el)}
            onClick={this.onImageClick}
          />
          <POIMarkers {...this.props} />
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

function POIMarkers({ activeEvents, selectedEvent }) {
  return activeEvents.map(POI => (
    <POIMarker {...POI} isSelected={POI.id === selectedEvent.id} key={POI.id} />
  ))
}

export default NNBMap
