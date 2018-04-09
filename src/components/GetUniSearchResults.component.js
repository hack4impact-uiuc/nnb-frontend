import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import { Icon } from './'

export default class GetUniSearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uniSearchInput: '',
      uniFilteredList: []
    }

    this.handleUniSearch = this.handleUniSearch.bind(this)
  }

  handleUniSearch(event) {
    this.setState({
      uniSearchInput: event.target.value
    })
  }

  render() {
    return (
      <div>
        <input
          id="textfield"
          className="navbar-content__item navbar-search__bar"
          type="text"
          value={this.uniSearchInput}
          onChange={this.handleUniSearch}
          placeholder="Search"
        />

        <Icon
          type="Search"
          size="large"
          className="navbar-content__item navbar-search__icon"
        />
      </div>
    )
  }
}
