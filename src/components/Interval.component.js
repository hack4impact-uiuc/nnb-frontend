import React, { Component } from 'react'
import classnames from 'classnames'
import './../styles/timeline.css'

class Interval extends Component {
  render() {
    const { width, map, setSelectedMap, selectedMapId } = this.props

    return (
      <div
        className={classnames('interval', {
          'interval--selected': selectedMapId === map.id
        })}
        onClick={() => setSelectedMap(map)}
        style={{ width: `${width}px` }}
      >
        <div className="line" />
        <div className="year">{map.year}</div>
        <div className="dot" />
      </div>
    )
  }
}

export default Interval
