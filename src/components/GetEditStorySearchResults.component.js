import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'
import moment from 'moment'

export default class GetEditStorySearchResults extends Component {
  handleSearch = event => {
    this.props.updateEditStorySearchInput(event.target.value)
    this.props.editStorySearchPOIs()
  }

  render() {
    const { pois } = this.props
    return (
      <div>
        <input
          id="textfield"
          className="navbar-content__item navbar-search__bar"
          type="text"
          value={this.searchInput}
          onChange={this.handleSearch}
          placeholder="Search"
          list="poi-dropdown"
        />

        <datalist id="poi-dropdown">
          <option disabled selected value>
            {' '}
            select a POI
          </option>
          {pois.map(poi => {
            return <option key={poi.id} value={poi.name} />
            //TODO should add key={poi.id}, but there are duplicate IDs and it's messing things up
          })}
        </datalist>
      </div>
    )
  }
}
