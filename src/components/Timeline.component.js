import React, { Component } from 'react'
import { Interval } from '../components'
import './../styles/timeline.css'

const MIN_INTERVAL_WIDTH = 50
const TIMELINE_PADDING = 40

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.calcIntervalWidth = this.calcIntervalWidth.bind(this)
  }

  // calculates the pixel width for each interval
  calcIntervalWidth(mapYears) {
    const ratios = mapYears.slice(1).map((n, i) => n - mapYears[i])
    const minRatio = Math.min(...ratios)
    const intervalWidthMultiplier = MIN_INTERVAL_WIDTH / minRatio
    const intervalWidths = ratios.map(ratio => ratio * intervalWidthMultiplier)

    // used for buffer for last interval - gets assigned MIN_INTERVAL_WIDTH
    let adjustedIntervalWidths = [...intervalWidths, MIN_INTERVAL_WIDTH]

    if (this.props.timelineContainer) {
      const timelineWidth =
        this.props.timelineContainer.offsetWidth - TIMELINE_PADDING
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

  render() {
    const { maps, loadPOIsForYear, selectedMap } = this.props
    const currSelectedYear = !!selectedMap && selectedMap.year
    const years = maps.map(map => map.year)
    const ratios = this.calcIntervalWidth(years)
    return (
      <div className="timeline" ref={t => (this.timeline = t)}>
        {maps.map((map, i) => (
          <Interval
            startYear={map.year}
            loadPOIsForYear={loadPOIsForYear}
            numMaps={maps.length}
            width={ratios[i]}
            key={map.year}
            isSelected={currSelectedYear === map.year}
          />
        ))}
      </div>
    )
  }
}

export default Timeline
