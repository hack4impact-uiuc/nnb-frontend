import React, { Component } from 'react'
import './../styles/timeline.css'

class Interval extends Component {
  render() {
    return (
      <div
        className="interval"
        onClick={() => this.props.loadPOIsForYear(this.props.startYear)}
        style={{ width: this.props.ratio * 100 + '%' }}
      >
        <div className="line" />
        <div className="tick" />
        {this.props.startYear}
      </div>
    )
  }
}

export default Interval
