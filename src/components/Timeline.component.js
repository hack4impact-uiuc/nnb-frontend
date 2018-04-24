import React, { Component } from 'react'
import classnames from 'classnames'
import { Interval, MapManager } from '../components'
import './../styles/timeline.css'

const MIN_INTERVAL_WIDTH = 50
const TIMELINE_PADDING = 40

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.calcIntervalWidth = this.calcIntervalWidth.bind(this)
    this.stubClick = this.stubClick.bind(this)
  }

  componentDidMount() {
    // sets the timelineContainer ref
    // needed for initial calcIntervalWidth
    this.forceUpdate()
  }

  // calculates the pixel width for each interval
  // TODO: when changing routes (from /form) the width isn't calculated
  calcIntervalWidth(mapYears) {
    const ratios = mapYears.slice(1).map((n, i) => n - mapYears[i])
    const minRatio = Math.min(...ratios)
    const intervalWidthMultiplier = MIN_INTERVAL_WIDTH / minRatio
    const intervalWidths = ratios.map(ratio => ratio * intervalWidthMultiplier)

    // used for buffer for last interval - gets assigned MIN_INTERVAL_WIDTH
    let adjustedIntervalWidths = [...intervalWidths, MIN_INTERVAL_WIDTH]

    if (this.timelineContainer) {
      const timelineWidth =
        this.timelineContainer.offsetWidth - TIMELINE_PADDING
      const intervalSum = adjustedIntervalWidths.reduce((a, b) => a + b, 0)
      if (intervalSum < timelineWidth) {
        const ratio = timelineWidth / intervalSum
        adjustedIntervalWidths = adjustedIntervalWidths.map(
          width => width * ratio
        )
      }
    }
    return adjustedIntervalWidths
  }

  stubClick(e) {
    e.stopPropagation()
  }

  render() {
    const { maps, isStorySelected, isEditing } = this.props
    const years = maps.map(map => map.year)
    const ratios = this.calcIntervalWidth(years)
    return (
      <div
        className="timeline-container"
        ref={t => (this.timelineContainer = t)}
      >
        {isEditing && <MapManager />}
        <div
          className={classnames('timeline', {
            'timeline--disabled': isStorySelected
          })}
          ref={t => (this.timeline = t)}
          style={{ [!maps.length && 'width']: '100%' }}
          onClickCapture={isStorySelected ? this.stubClick : undefined}
        >
          {maps.map((map, i) => (
            <Interval width={ratios[i]} key={map.year} map={map} />
          ))}
        </div>
      </div>
    )
  }
}

export default Timeline
