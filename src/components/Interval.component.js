import React, { Component } from 'react'
import classnames from 'classnames'
import './../styles/timeline.css'

class Interval extends Component {
  render() {
    const { ratio, isSelected, startYear, loadPOIsForYear } = this.props

    // set the minimum width to be 5%
    const width = ratio * 100 > 5 ? ratio * 100 : 5

    return (
      <div
        className={classnames('interval', {
          'interval--selected': isSelected
        })}
        onClick={() => loadPOIsForYear(startYear)}
        style={{ width: `${width}%` }}
      >
        <div className="line" />
        <div className="year">{startYear}</div>
        <div className="dot" />
      </div>
    )
  }
}

export default Interval
