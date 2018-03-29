import React, { Component } from 'react'

export default class GetMaps extends Component {
  render() {
    const { maps, selectedMapId, loadMaps, createMap, removeMap } = this.props
    return (
      <div>
        <button onClick={loadMaps}>
          This is the get years button. clicc me
        </button>
        <ul>{maps.map(map => <li>{map.year}</li>)}</ul>
      </div>
    )
  }
}
