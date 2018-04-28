import React, { Component } from 'react'
import { Alert, Form, Modal } from 'react-bootstrap'
import { FieldGroup, Icon } from '../components'
import { Api } from './../utils'
import './../styles/map.css'

class MapManager extends Component {
  state = {
    showInputFields: false,
    inputYear: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditing === false) {
      this.setState({ showInputFields: false })
    }
  }

  toggleShowInputFields = () => {
    this.setState({
      showInputFields: !this.state.showInputFields,
      inputYear: '',
      imageUrl: ''
    })
  }

  onChangeYear = e => {
    const inputYear = e.target.value
    const inputYearExists = this.props.mapYears.includes(+inputYear)
    this.setState({
      inputYear,
      [inputYearExists && 'error']: `Map already exists for ${inputYear}`,
      [!inputYearExists && 'error']: null
    })
  }

  onSubmit = () => {
    const { createMap, loadMaps, loadPOIs } = this.props
    const { inputYear, imageUrl } = this.state

    if (inputYear === '' || imageUrl === '') {
      console.warn('Warning: empty fields!')
      return
    }
    const map = {
      imageUrl,
      year: inputYear
    }

    // explicitly calling loadMaps and loadPOIs to deal with the issue of
    // a previously selected POI on a different map
    // remaining selected on the newly created map
    // see `showConfirmDeleteMap` in the NNBMap component
    createMap(map)
      .then(() => loadMaps())
      .then(() => loadPOIs())
    this.toggleShowInputFields()
  }

  onImageUpload = e => {
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

  isFormValid = () => {
    const inputYear = +this.state.inputYear
    const inputYearExists = this.props.mapYears.includes(inputYear)
    return Number.isInteger(inputYear) && inputYear >= 0 && !inputYearExists
  }

  showConfirmDeleteMap = () => {
    if (
      window.confirm(
        'Delete the current map? This will also delete all POIs associated with this map.'
      )
    ) {
      const {
        deleteMap,
        selectedMap,
        loadMaps,
        activePOIs,
        selectedPOIId,
        setPreviewingPOI,
        setSelectedPOI,
        loadPOIs
      } = this.props
      const selectedPOI = activePOIs.find(poi => poi.id === selectedPOIId)

      // explicity call this since the payload for MAP_DELETED only includes the map id
      // but the pois only contain the map year.
      // therefore we can't tell if the poi is on that map
      // ideally all this should be reactive but it would require changing the api and db schema...
      if (selectedPOI && selectedMap.year === selectedPOI.mapYear) {
        setSelectedPOI({ id: null })
      }

      deleteMap(selectedMap.id)
        .then(() => loadMaps())
        .then(() => loadPOIs())
    }
  }

  shouldDisableSubmit = () => {
    const { inputYear, imageUrl } = this.state
    return !inputYear || !imageUrl || !this.isFormValid()
  }

  render() {
    const {
      showInputFields,
      inputYear,
      isUploadingMedia,
      imageUrl,
      error,
      showConfirmDeleteMap
    } = this.state

    return (
      <div className="map-manager-icon">
        <Icon
          type={showInputFields ? 'X' : 'Plus'}
          size="large"
          onClick={this.toggleShowInputFields}
          className="map-manager-icon__icon"
        />
        <Icon
          type="Trash2"
          size="large"
          className="map-icon map-icon__box"
          onClick={this.showConfirmDeleteMap}
        />
        <Modal show={showInputFields} onHide={this.toggleShowInputFields}>
          <Modal.Header closeButton>
            <Modal.Title>Add a map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showInputFields && (
              <Form inline className="modal-form">
                <FieldGroup
                  controlID="year"
                  label="Year"
                  inputType="text"
                  placeholder="Enter the map year here"
                  value={inputYear}
                  onChange={this.onChangeYear}
                  className="modal-form__field-group specifier"
                  labelClassName="modal-form__label"
                  validationState={this.isFormValid() ? null : 'error'}
                />

                <FieldGroup
                  controlID="chooseFile"
                  label="Upload Map Image"
                  inputType="file"
                  onChange={this.onImageUpload}
                  className="modal-form__field-group specifier"
                  labelClassName="modal-form__label"
                />

                <div className="modal-form__field-group specifier modal-form__status">
                  {!isUploadingMedia &&
                    !imageUrl && <div>Please upload map image</div>}
                  {!!imageUrl && <div>Image uploaded</div>}
                  {isUploadingMedia && <div>Uploading...</div>}
                </div>

                {error && <Alert bsStyle="danger">{error}</Alert>}

                <FieldGroup
                  inputType="button"
                  buttonText="Submit"
                  onClick={this.onSubmit}
                  disabled={this.shouldDisableSubmit()}
                />
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default MapManager
