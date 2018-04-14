import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import { Icon } from './'

export default class GetUniSearchResults extends Component {
  handleUniSearch = event => {
    this.props.updateUniSearchInput(event.target.value)
    this.props.uniSearchPOIs()
  }

  handleSelectPoi = event => {
    this.props.setSelectedPOI({ id: parseInt(event.target.value) }) //TODO: it's not working lol
  }

  render() {
    const { pois } = this.props
    return (
      <div>
        <input
          id="textfield"
          className="navbar-content__item navbar-search__bar"
          type="text"
          value={this.uniSearchInput}
          onChange={this.handleUniSearch}
          placeholder="Search"
          list="poi-dropdown"
        />

        <select onChange={this.handleSelectPoi} value={this.selectedPoi}>
          {pois.map(poi => {
            return <option value={poi.id}>{poi.name}</option>
            //should add key={poi.id}, but there are duplicate IDs and it's messing things up
          })}
        </select>

        <Icon
          type="Search"
          size="large"
          className="navbar-content__item navbar-search__icon"
        />
      </div>
    )
  }
}
