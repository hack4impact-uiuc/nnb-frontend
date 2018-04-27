import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import { Icon } from './'
import './../styles/search.css'

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

  onSuggestionsFetchRequested = () => {
    this.props.searchUniversalPOIs()
  }

  renderSuggestion = poi => {
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
        <Autosuggest
          suggestions={pois}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={poi => poi.name}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: 'search-container',
            suggestionsContainerOpen: 'search-suggContainer',
            suggestionHighlighted: 'search-suggHighlight',
            suggestion: 'search-suggestion',
            suggestionsList: 'search-suggList'
          }}
        />
      </div>
    )
  }
}
