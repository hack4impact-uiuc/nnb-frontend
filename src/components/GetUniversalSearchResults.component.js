import React, { Component } from 'react'
import { POISearch } from './'
import { debounce } from 'lodash'

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

  componentDidMount = () => {
    this.fetchRequestWrapper = debounce(this.fetchRequestWrapper, 250)
  }

  fetchRequestWrapper = () => {
    this.props.searchUniversalPOIs()
  }

  render() {
    const { pois, searchInput } = this.props

    return (
      <POISearch
        pois={pois}
        searchInput={searchInput}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={this.fetchRequestWrapper}
        onChangeInput={this.onChange}
      />
    )
  }
}
