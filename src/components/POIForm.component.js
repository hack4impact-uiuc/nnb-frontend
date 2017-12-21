import React, { Component } from 'react'
import { FormControl, Form, Image, PageHeader } from 'react-bootstrap'
import moment from 'moment'
import { FieldGroup, OurTable } from '../components'
import { Api } from './../utils'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/App.css'

class POIForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      title: '',
      description: '',
      stories: [],
      isUploadingMedia: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    // this.onStorySelect = this.onStorySelect.bind(this)
    this.onImageUpload = this.onImageUpload.bind(this)
    this.handleFormInput = this.handleFormInput.bind(this)
  }

  handleFormInput(type, input) {
    let newVal
    switch (type) {
      case 'title':
      case 'description':
        newVal = input.target.value
        break
      case 'stories':
        newVal = this.handleStorySelect(input)
        break
      default:
        newVal = input
    }
    this.setState(
      {
        [type]: newVal
      },
      () => this.props.updatePOI(this.state)
    )
  }

  clearState() {
    this.setState({
      startDate: moment(),
      title: '',
      description: '',
      storiesToAdd: [],
      isUploadingMedia: false,
      mediaUrl: ''
    })
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
          this.setState({ isUploadingMedia: false, mediaUrl }, () =>
            this.props.updatePOI(this.state)
          )
        })
      }
      reader.readAsDataURL(image)
    }
  }

  onSubmit() {
    const {
      selectedMap,
      clickedCoords,
      loadPOIsForYear,
      setShowPOIForm,
      setSelectedPOI
    } = this.props
    const { title, description, startDate } = this.state
    const [coordinateX, coordinateY] = clickedCoords

    if (title === '' || description === '') {
      console.warn('Warning: empty fields!')
    }
    const poi = {
      title: title,
      mapByYear: selectedMap.year,
      description,
      date: startDate,
      coordinateX,
      coordinateY,
      links: ['google.com', 'purple.com']
    }

    Api.postPOI(poi)
      .then(poi =>
        loadPOIsForYear(selectedMap.year).then(() => setSelectedPOI(poi.id))
      )
      .then(() => setShowPOIForm(false))
  }

  onCancel() {
    this.setState(
      {
        startDate: '',
        title: '',
        description: '',
        storiesToAdd: [],
        isUploadingMedia: false,
        mediaUrl: ''
      },
      () => this.props.updatePOI(this.state)
    )
    this.props.setShowPOIForm(false)
  }

  handleStorySelect(storyId) {
    const storiesSet = new Set(this.state.storiesToAdd)

    if (storiesSet.has(storyId)) {
      storiesSet.delete(storyId)
    } else {
      storiesSet.add(storyId)
    }

    return [...storiesSet]
  }

  // onStorySelect(storyId) {
  //   const storiesSet = new Set(this.state.storiesToAdd)

  //   if (storiesSet.has(storyId)) {
  //     storiesSet.delete(storyId)
  //   } else {
  //     storiesSet.add(storyId)
  //   }
  //   // this.setState({
  //   //   storiesToAdd: [...storiesSet]
  //   // })
  //   const storiesToAdd = [...storiesSet]
  //   this.handleFormInput('stories', storiesToAdd)
  //   // this.props.updatePOI(this.state)
  // }

  render() {
    return (
      <Form horizontal>
        <PageHeader>Create POI</PageHeader>

        <FieldGroup
          controlID="title"
          label="POI Title"
          inputType="text"
          placeholder="Enter your POI title here"
          value={this.state.title}
          onChange={this.handleFormInput.bind(this, 'title')}
        />

        <FieldGroup
          inputType="date"
          label="POI Date"
          selected={this.state.startDate}
          onChange={this.handleFormInput.bind(this, 'date')}
        />

        <FieldGroup
          controlID="description"
          label="POI Description"
          inputType="textarea"
          placeholder="Enter your POI description here"
          value={this.state.description}
          onChange={this.handleFormInput.bind(this, 'description')}
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

        <OurTable colNames={['Link URL', 'Display Name']} />

        <FieldGroup
          inputType="checklist"
          options={this.props.stories}
          label="Stories"
          onClick={this.handleFormInput.bind(this, 'stories')}
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
