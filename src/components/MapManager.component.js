import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Api } from './../utils'

class MapManager extends Component {
  state = {
    showInputFields: false,
    inputYear: '',
    inputImageUrl: ''
  }

  constructor(props) {
    super(props)
    this.toggleShowInputFields = this.toggleShowInputFields.bind(this)
    this.onChangeYear = this.onChangeYear.bind(this)
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.showConfirmDeleteMap = this.showConfirmDeleteMap.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditing === false) {
      this.setState({ showInputFields: false })
    }
  }

  toggleShowInputFields() {
    this.setState({
      showInputFields: !this.state.showInputFields,
      inputYear: '',
      inputImageUrl: ''
    })
  }

  onChangeYear(inputYear) {
    this.setState({
      inputYear: inputYear.target.value
    })
  }

  onChangeImageUrl(inputImageUrl) {
    this.setState({
      inputImageUrl: inputImageUrl.target.value
    })
  }

  onSubmit() {
    const { loadMaps } = this.props
    const { inputYear, inputImageUrl } = this.state

    if (inputYear === '' || inputImageUrl === '') {
      console.warn('Warning: empty fields!')
      return
    }
    const map = {
      imageUrl: inputImageUrl,
      year: inputYear
    }

    Api.postMap(map).then(() => loadMaps())
  }

  showConfirmDeleteMap() {
    if (
      window.confirm(
        'Delete the current map? This will also delete all POIs associated with this map.'
      )
    ) {
      this.props.deleteMap(this.props.selectedMap.id)
    }
  }

  render() {
    const { showInputFields } = this.state

    return (
      <div>
        <Button onClick={this.toggleShowInputFields}>
          {showInputFields ? 'Cancel' : 'Add map'}
        </Button>
        {showInputFields && (
          <form onSubmit={this.handleSubmit}>
            <label>
              Year:
              <input
                type="text"
                value={this.state.inputYear}
                onChange={this.onChangeYear}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                value={this.state.inputImageUrl}
                onChange={this.onChangeImageUrl}
              />
            </label>
            <Button onClick={this.onSubmit}>Submit</Button>
          </form>
        )}
        {!showInputFields && (
          <Button onClick={this.showConfirmDeleteMap}>Delete map</Button>
        )}
      </div>
    )
  }
}

export default MapManager
