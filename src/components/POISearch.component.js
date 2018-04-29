import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import './../styles/search.css'

export default class POISearch extends Component {
  renderSuggestion = poi => {
    return <span value={poi.id}>{poi.name}</span>
  }

  render() {
    const {
      pois,
      searchInput,
      onSuggestionsFetchRequested,
      onSuggestionSelected,
      onChangeInput
    } = this.props

    const inputProps = {
      placeholder: 'Search',
      value: searchInput,
      onChange: onChangeInput
    }

    return (
      <div>
        <Autosuggest
          suggestions={pois}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={poi => poi.name}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: 'search-container',
            suggestionsContainerOpen: 'search-suggContainer',
            suggestionHighlighted: 'search-suggHighlight',
            suggestion: 'search-suggestion',
            suggestionsList: 'search-suggList',
            input: 'search-input'
          }}
        />
      </div>
    )
  }
}
