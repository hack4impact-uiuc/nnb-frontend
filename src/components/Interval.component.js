import React, { Component } from 'react'
import './../styles/timeline.css'

class Interval extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className="interval"
        onClick={() => this.props.loadPOIsForYear(this.props.startYear)}
      >
        <div
          className="line"
          style={{ width: 1190 / this.props.numMaps + 'px' }}
        />
        <div className="tick" />
        {this.props.startYear}
      </div>
    )
  }
}

export default Interval
