import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

class InfoPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const selectedEvent = this.props.selectedEvent
    const img_url = selectedEvent.image

    return (
      <div classname="InfoPanel">
        <h1>
          <u>
            <b>{selectedEvent.title} </b>
          </u>
        </h1>
        <div className="Top-section">
          <div className="InfoPanel">
            <Image src={selectedEvent.image} alt="H4I image" responsive />
            <hr />
            <h3>Description:</h3>
            <p>{selectedEvent.description}</p>
            <hr />
            <h3>Additional Links:</h3>
            <ul>
              {selectedEvent.links.map(item => (
                <li>
                  <a href={item}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPanel
