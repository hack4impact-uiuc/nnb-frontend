import React, { Component } from 'react'
import { POISearch } from './'

export default class GetUniversalSearchResults extends Component {
  onChange = (event, { newValue, method }) => {
    newValue !== 'undefined'
      ? this.props.updateUniversalSearchInput(newValue)
      : this.props.updateUniversalSearchInput('')
  }

  onSuggestionSelected = (event, { suggestion }) => {
    const mapYear = suggestion.mapYear
    const destinationMap = this.props.maps.filter(m => m.year === mapYear)
    this.props.setSelectedMap(destinationMap[0])
    this.props.setSelectedPOI(suggestion)
  }

  render() {
    const { pois, searchInput } = this.props

    return (
      <POISearch
        pois={pois}
        searchInput={searchInput}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={() => this.props.searchUniversalPOIs()}
        onChangeInput={this.onChange}
      />
    )
  }
}
