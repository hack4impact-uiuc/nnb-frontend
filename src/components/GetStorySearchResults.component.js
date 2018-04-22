import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'

export default class GetStorySearchResults extends Component {
  onChange = (event, { newValue, method }) => {
    newValue !== 'undefined'
      ? this.props.updateStorySearchInput(newValue)
      : this.props.updateStorySearchInput('')
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.handleSelect(suggestion)
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      pois: []
    })
  }

  onSuggestionsFetchRequested = () => {
    this.props.storySearchPOIs()
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
