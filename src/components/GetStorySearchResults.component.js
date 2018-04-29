import React, { Component } from 'react'
import { POISearch } from './'

export default class GetStorySearchResults extends Component {
  onChange = (event, { newValue, method }) => {
    newValue !== 'undefined'
      ? this.props.updateStorySearchInput(newValue)
      : this.props.updateStorySearchInput('')
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.handleSelect(suggestion)
  }

  render() {
    const { pois, searchInput } = this.props

    return (
      <POISearch
        pois={pois}
        searchInput={searchInput}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={() => this.props.searchStoryPOIs()}
        onChangeInput={this.onChange}
      />
    )
  }
}
