import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FieldGroup } from '../components'
import { Api } from './../utils'

class MapManager extends Component {
  state = {
    showInputFields: false,
    inputYear: ''
  }

  constructor(props) {
    super(props)
    this.toggleShowInputFields = this.toggleShowInputFields.bind(this)
    this.onChangeYear = this.onChangeYear.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.showConfirmDeleteMap = this.showConfirmDeleteMap.bind(this)
    this.onImageUpload = this.onImageUpload.bind(this)
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
      imageUrl: ''
    })
  }

  onChangeYear(inputYear) {
    this.setState({
      inputYear: inputYear.target.value
    })
  }

  onSubmit() {
    const { loadMaps } = this.props
    const { inputYear, imageUrl } = this.state

    if (inputYear === '' || imageUrl === '') {
      console.warn('Warning: empty fields!')
      return
    }
    const map = {
      imageUrl,
      year: inputYear
    }

    Api.postMap(map)
      .then(() => loadMaps())
      .then(() => this.toggleShowInputFields())
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

  onImageUpload(e) {
    const image = e.target.files[0]
    if (image) {
      this.setState({ isUploadingMedia: true })
      const reader = new FileReader()
      reader.onload = e => {
        const dataURL = e.target.result
        Api.uploadImage(dataURL).then(imageUrl => {
          this.setState({
            isUploadingMedia: false,
            imageUrl
          })
        })
      }
      reader.readAsDataURL(image)
    }
  }

  render() {
    const { showInputFields, inputYear, isUploadingMedia } = this.state

    return (
      <div>
        <Button onClick={this.toggleShowInputFields}>{'Add map'}</Button>

        <Modal show={showInputFields} onHide={this.toggleShowInputFields}>
          <Modal.Header closeButton>
            <Modal.Title>Add a map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showInputFields && (
              <Form inline>
                <FieldGroup
                  controlID="year"
                  label="Year"
                  inputType="text"
                  placeholder="Enter the map year here"
                  value={inputYear}
                  onChange={this.onChangeYear}
                />

                <FieldGroup
                  controlID="chooseFile"
                  label="Upload Media"
                  inputType="file"
                  placeholder="Upload your files here"
                  onChange={this.onImageUpload}
                />
                {isUploadingMedia && <div>Uploading...</div>}

                <FieldGroup
                  inputType="button"
                  label=""
                  buttonText="Submit"
                  onClick={this.onSubmit}
                />
              </Form>
            )}
          </Modal.Body>
        </Modal>

        {!showInputFields && (
          <Button onClick={this.showConfirmDeleteMap}>Delete map</Button>
        )}
      </div>
    )
  }
}

export default MapManager
