import React, { Component } from 'react'
import { FormControl, Form, Image, PageHeader } from 'react-bootstrap'
import moment from 'moment'
import { FieldGroup, OurTable } from '../components'
import { Api } from './../utils'
import 'react-datepicker/dist/react-datepicker.css'

class POIForm extends Component {
  constructor(props) {
    super(props)
    this.onDateSelected = this.onDateSelected.bind(this)
    this.state = {
      startDate: moment(),
      name: '',
      description: '',
      storiesToAdd: [],
      isUploadingMedia: false,
      content: []
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onStorySelect = this.onStorySelect.bind(this)
    this.onImageUpload = this.onImageUpload.bind(this)
  }

  // TODO: handle multiple file upload
  onImageUpload(e) {
    const image = e.target.files[0]
    if (image) {
      this.setState({ isUploadingMedia: true })
      const reader = new FileReader()
      reader.onload = e => {
        const dataURL = e.target.result
        Api.uploadImage(dataURL).then(mediaUrl => {
          this.setState({
            isUploadingMedia: false,
            content: [...this.state.content, mediaUrl]
          })
        })
      }
      reader.readAsDataURL(image)
    }
  }

  onDateSelected(date) {
    this.setState({
      startDate: date
    })
  }

  onChangeName(inputName) {
    this.setState({
      name: inputName.target.value
    })
  }

  onChangeDescription(inputDesription) {
    this.setState({
      description: inputDesription.target.value
    })
  }

  onSubmit() {
    const {
      selectedMap,
      clickedCoords,
      loadPOIsForYear,
      setShowPOIForm,
      setSelectedPOI
    } = this.props
    const {
      name,
      description,
      startDate,
      isUploadingMedia,
      content
    } = this.state
    const [coordinateX, coordinateY] = clickedCoords

    if (isUploadingMedia) {
      alert('Wait for media to upload!')
      return
    }
    if (name === '' || description === '') {
      console.warn('Warning: empty fields!')
    }
    const poi = {
      title: name,
      mapByYear: selectedMap.year,
      description,
      date: startDate,
      coordinateX,
      coordinateY,
      links: [],
      content: content.map(contentUrl => ({
        contentUrl: contentUrl,
        caption: 'caption'
      }))
    }

    Api.postPOI(poi)
      .then(poi =>
        loadPOIsForYear(selectedMap.year).then(() => setSelectedPOI(poi.id))
      )
      .then(() => setShowPOIForm(false))
  }

  onCancel() {
    this.setState({
      startDate: '',
      name: '',
      description: '',
      storiesToAdd: []
    })
    this.props.setShowPOIForm(false)
  }

  onStorySelect(storyId) {
    const storiesSet = new Set(this.state.storiesToAdd)

    if (storiesSet.has(storyId)) {
      storiesSet.delete(storyId)
    } else {
      storiesSet.add(storyId)
    }
    this.setState({
      storiesToAdd: [...storiesSet]
    })
  }

  render() {
    return (
      <Form horizontal>
        <PageHeader>Create POI</PageHeader>

        <FieldGroup
          controlID="name"
          label="POI Name"
          inputType="text"
          placeholder="Enter your POI name here"
          value={this.state.name}
          onChange={this.onChangeName}
        />

        <FieldGroup
          inputType="date"
          label="POI Date"
          selected={this.state.startDate}
          onChange={this.onDateSelected}
        />

        <FieldGroup
          controlID="description"
          label="POI Description"
          inputType="textarea"
          placeholder="Enter your POI description here"
          value={this.state.description}
          onChange={this.onChangeDescription}
        />

        <FieldGroup
          controlID="chooseFile"
          label="Upload Media"
          inputType="file"
          placeholder="Upload your files here"
          onChange={this.onImageUpload}
        />
        {this.state.isUploadingMedia && <div>Uploading...</div>}
        {this.state.mediaUrl && <Image src={this.state.mediaUrl} responsive />}

        <div>
          <OurTable colNames={['Link URL', 'Display Name']} />
        </div>

        <FieldGroup
          inputType="checklist"
          stories={this.props.stories}
          label="Stories"
          onStorySelect={this.onStorySelect}
        />

        <FormControl.Feedback />

        <FieldGroup
          inputType="button"
          label=""
          buttonText="Create"
          onClick={this.onSubmit}
        />

        <FieldGroup
          inputType="button"
          label=""
          buttonText="Cancel"
          onClick={this.onCancel}
        />
      </Form>
    )
  }
}

export default POIForm
