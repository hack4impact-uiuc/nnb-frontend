import React, { Component } from 'react'
import { Image, Button, FormGroup, Col } from 'react-bootstrap'
import './../styles/App.css'

class InfoPanel extends Component {
  constructor(props) {
    super(props)
  }

  onClickPrevious(e) {
    let ae = this.props.activeEvents
    let curIndex = ae.findIndex(POI => POI.id == this.props.selectedEvent.id)
    let newIndex = curIndex - 1
    let len = this.props.activeEvents.length
    if (newIndex < 0) {
      newIndex = 0
    }
    this.props.setSelectedPOI(ae[newIndex].id)
  }

  onClickNext(e) {
    let ae = this.props.activeEvents
    let curIndex = ae.findIndex(POI => POI.id == this.props.selectedEvent.id)
    let newIndex = curIndex + 1
    let len = this.props.activeEvents.length
    if (newIndex >= len) {
      newIndex = len - 1
    }
    this.props.setSelectedPOI(ae[newIndex].id)
  }

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

            <FormGroup controlID="ChangePOIs">
              <Col smOffset={3} sm={10}>
                <Button
                  bsStyle="primary"
                  type="previous"
                  onClick={this.onClickPrevious.bind(this)}
                >
                  {' '}
                  Previous{' '}
                </Button>
                <Button
                  bsStyle="primary"
                  type="next"
                  onClick={this.onClickNext.bind(this)}
                >
                  {' '}
                  Next{' '}
                </Button>
              </Col>
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPanel
