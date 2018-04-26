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
    let mapYear = suggestion.mapYear
    let res = this.props.maps.filter(m => m.year === mapYear)
    this.props.setSelectedMap(res[0])
    this.props.setSelectedPOI(suggestion)
  }

  onSuggestionsFetchRequested = () => {
    this.props.universalSearchPOIs()
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
        <Autosuggest
          suggestions={pois}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getPoiValue}
          renderSuggestion={this.renderPoi}
          inputProps={inputProps}
          theme={{container: 'search-container',
                  suggestionsContainerOpen: 'search-suggContainer',
                  suggestionHighlighted: 'search-suggHighlight',
                  suggestion: 'search-suggestion',
                  suggestionsList: 'search-suggList'
                  } }
        />
      </div>
    )
  }
}