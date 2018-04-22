import React, { Component } from 'react'
import { FieldGroup } from '../components'
import moment from 'moment'

export default class GetStorySearchResults extends Component {
  constructor(props) {
    super(props)
  }

  handleSearch = event => {
    this.props.updateStorySearchInput(event.target.value)
    this.props.storySearchPOIs()
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
              <li key={poi.id} onClick={() => this.props.handleSelect(poi)}>
                {poi.name}
              </li>
            )
          })}
        </div>
      </div>
    )
  }
}
