import React, { Component } from 'react'
import { FieldGroup } from '../components'
import moment from 'moment'
import Autosuggest from 'react-autosuggest'
import { Icon } from './'

export default class GetUniSearchResults extends Component {
  handleSearch = event => {
    this.props.updateUniSearchInput(event.target.value)
    this.props.uniSearchPOIs()
  }

  onChange = (event, { newValue, method }) => {
    newValue !== 'undefined'
      ? this.props.updateUniSearchInput(newValue)
      : this.props.updateUniSearchInput('')
  }

  onSuggestionSelected = (event, { suggestion }) => {
    let mapYear = suggestion.mapByYear
    let res = this.props.maps.filter(m => m.year === mapYear)
    this.props.setSelectedMap(res[0])
    this.props.setSelectedPOI(suggestion)
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      pois: []
    })
  }

  onSuggestionsFetchRequested = () => {
    this.props.uniSearchPOIs()
  }

  getPoiValue = poi => poi.name

  renderPoi = poi => {
    return <span value={poi.id}>{poi.name}</span>
  }

  render() {
    const { pois, searchInput } = this.props

    const inputProps = {
      placeholder: 'Search',
      value: searchInput,
      onChange: this.onChange
    }

    return (
      <div>
        <Icon
          type="Search"
          size="small"
          className="navbar-content__item navbar-search__icon"
        />
        <h2>Search for POIs</h2>
        <Autosuggest
          suggestions={pois}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getPoiValue}
          renderSuggestion={this.renderPoi}
          inputProps={inputProps}
        />
      </div>
    )
  }
}
