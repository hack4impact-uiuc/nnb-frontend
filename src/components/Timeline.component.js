import React, { Component } from 'react'
import { Interval, Icon } from '../components'
import './../styles/timeline.css'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.calcRatio = this.calcRatio.bind(this)
  }

  calcRatio(mapYears) {
    const ratios = mapYears.slice(1).map((n, i) => n - mapYears[i])
    const total = ratios.reduce((a, b) => a + b, 0)
    return ratios.map(ratio => ratio / total * 0.9) //TODO: change 0.9 to a predefined constant
  }

  render() {
    const { maps, loadPOIsForYear, selectedMap, isEditing } = this.props
    const currSelectedYear = !!selectedMap && selectedMap.year
    const years = maps.map(map => map.year)
    const ratios = [...this.calcRatio(years), 0.1] //TODO: change 0.1 to a predefined constant
    return (
      <div className="timeline" style={{ width: 100 + '%' }}>
        {/*isEditing && (
          <Icon
            type="Plus"
            size="large"
            className="map-icon map-icon__box"
            onClick={}
          />
        )*/}
        {maps.map((map, i) => (
          <Interval
            startYear={map.year}
            loadPOIsForYear={loadPOIsForYear}
            numMaps={maps.length}
            ratio={ratios[i]}
            key={map.year}
            isSelected={currSelectedYear === map.year}
          />
        ))}
      </div>
    )
  }
}

export default Timeline
