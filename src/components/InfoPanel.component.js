import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import './../styles/App.css'

class InfoPanel extends Component {
  render() {
    const selectedEvent = this.props.selectedEvent
    return (
      <div className="info-panel">
        <h1>
          <u>
            <b>{selectedEvent.title} </b>
          </u>
        </h1>
        <div>
          <div>
            <Image
              src={selectedEvent.image}
              alt={selectedEvent.title}
              responsive
            />
            <hr />
            <h3>Description:</h3>
            <p>{selectedEvent.description}</p>
            <hr />
            <h3>Additional Links:</h3>
            <ul>
              {selectedEvent.links.map(link => (
                <li key={link}>
                  <a href={link}>{link}</a>
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
