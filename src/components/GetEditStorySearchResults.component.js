import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'
import moment from 'moment'

export default class GetEditStorySearchResults extends Component {
  constructor(props) {
    super(props)
  }

  handleSearch = event => {
    this.props.updateEditStorySearchInput(event.target.value)
    this.props.editStorySearchPOIs()
    console.log(this)
  }

  render() {
    const { pois } = this.props
    return (
      <div>
        <input
          id="textfield"
          type="text"
          value={this.searchInput}
          onChange={this.handleSearch}
          placeholder="Search"
        />

        <div>
          {pois.map(poi => {
            return (
              <li key={poi.id} value={poi.id} onClick={this.props.handleSelect}>
                {poi.name}
              </li>
            )
          })}
        </div>
      </div>
    )
  }
}
/*
<datalist id="poi-dropdown" onChange={this.handleSelectPoi}>
  <option disabled selected value>
    {' '}
    select a POI
  </option>
  {pois.map(poi => {
    return <option key={poi.id} data-value={poi.id}>{poi.name}</option>
    //TODO should add key={poi.id}, but there are duplicate IDs and it's messing things up
  })}
</datalist>

        <input type="hidden"/>
*/
