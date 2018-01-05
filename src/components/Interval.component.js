import React, { Component } from 'react'
import classnames from 'classnames'
import './../styles/timeline.css'

class Interval extends Component {
  render() {
    const { width, isSelected, startYear, loadPOIsForYear } = this.props

    return (
      <div
        className={classnames('interval', {
          'interval--selected': isSelected
        })}
        onClick={() => loadPOIsForYear(startYear)}
        style={{ width: `${width}px` }}
      >
        <div className="line" />
        <div className="year">{startYear}</div>
        <div className="dot" />
      </div>
    )
  }
}

export default Interval
