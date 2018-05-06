import React, { Component } from 'react'
import classnames from 'classnames'
import { Interval, MapManager } from '../components'
import './../styles/timeline.css'

const MIN_INTERVAL_WIDTH = 30
const TIMELINE_PADDING = 40

class Timeline extends Component {
  componentDidMount() {
    // sets the timelineContainer ref
    // needed for initial calcIntervalWidth
    this.forceUpdate()
  }

  // function to convert ratio into an interval width. the mapping is not linear but logarithmic,
  // or else we would have cases where intervals would have very different lengths and scrolling
  // would be a chore.
  ratioToWidth(intervalWidthConst, ratio) {
    return intervalWidthConst + 100 * Math.log(ratio) // intervalWidthConst - 100 / ratio //
  }

  // calculates the pixel width for each interval
  calcIntervalWidth = mapYears => {
    const ratios = mapYears.slice(1).map((n, i) => n - mapYears[i])
    const minRatio = Math.min(...ratios)
    const intervalWidthConst = MIN_INTERVAL_WIDTH - 100 * Math.log(minRatio) // MIN_INTERVAL_WIDTH + 100 / minRatio //
    const intervalWidths = ratios.map(ratio =>
      this.ratioToWidth(intervalWidthConst, ratio)
    )

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

  stubClick = e => {
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
