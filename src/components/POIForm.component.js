import React, { Component } from 'react'
import {
  FormControl,
  Form,
  PageHeader,
  Grid,
  Col,
  ControlLabel
} from 'react-bootstrap'
import moment from 'moment'
import { FieldGroup, OurTable } from '../components'
import { Api } from './../utils'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/App.css'
import './../styles/poi-form.css'
import './../styles/button.css'

class POIForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment('1/1/' + this.props.selectedMap.year),
      name: '',
      description: '',
      stories: [],
      isUploadingMedia: false,
      content: [],
      links: []
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onImageUpload = this.onImageUpload.bind(this)
    this.handleFormInput = this.handleFormInput.bind(this)
  }

  handleFormInput(type, input) {
    let newVal
    switch (type) {
      case 'name':
      case 'description':
        newVal = input.target.value
        break
      case 'stories':
        newVal = this.handleStorySelect(input)
        break
      case 'links':
        newVal = input
        break
      default:
        newVal = input
    }
    this.setState({ [type]: newVal }, () => this.props.updatePOI(this.state))
  }

  clearState() {
    this.setState(
      {
        startDate: moment(),
        name: '',
        description: '',
        stories: [],
        links: [],
        isUploadingMedia: false,
        mediaUrl: ''
      },
      () => this.props.updatePOI(this.state)
    )
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
          this.setState(
            {
              isUploadingMedia: false,
              content: [...this.state.content, mediaUrl]
            },
            () => this.props.updatePOI(this.state)
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

    const {
      name,
      description,
      startDate,
      isUploadingMedia,
      content,
      links,
      stories
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
      name,
      mapByYear: selectedMap.year,
      description,
      date: startDate,
      coordinateX,
      coordinateY,
      links: links.map(linkTuple => ({
        url: linkTuple[0],
        urlName: linkTuple[1]
      })),
      content: content.map(contentUrl => ({
        contentUrl: contentUrl,
        caption: 'caption'
      }))
    }

    Api.postPOI(poi)
      .then(poi => {
        Api.postPOIToStories(poi, stories)
        return poi
      })
      .then(poi =>
        loadPOIsForYear(selectedMap.year).then(() => setSelectedPOI(poi.id))
      )
      .then(() => setShowPOIForm(false))
  }

  onCancel() {
    this.clearState()
    this.props.setShowPOIForm(false)
  }

  handleStorySelect(storyId) {
    const storiesSet = new Set(this.state.stories)

    if (storiesSet.has(storyId)) {
      storiesSet.delete(storyId)
    } else {
      storiesSet.add(storyId)
    }

    return [...storiesSet]
  }

  render() {
    const { startDate, description, isUploadingMedia } = this.state

    return (
      <Form horizontal className="poi-form">
        <PageHeader className="form-header">Create POI</PageHeader>

        <FieldGroup
          controlID="name"
          label="POI Name"
          inputType="text"
          placeholder="Enter your POI name here"
          onChange={this.handleFormInput.bind(this, 'name')}
        />

        <FieldGroup
          inputType="date"
          label="POI Date"
          selected={startDate}
          onChange={this.handleFormInput.bind(this, 'date')}
        />

        <FieldGroup
          controlID="description"
          label="POI Description"
          inputType="textarea"
          placeholder="Enter your POI description here"
          value={description}
          onChange={this.handleFormInput.bind(this, 'description')}
        />

        <FieldGroup
          controlID="chooseFile"
          label="Upload Media"
          inputType="file"
          placeholder="Upload your files here"
          onChange={this.onImageUpload}
        />
        {isUploadingMedia && <div>Uploading...</div>}

        <Col sm={2} componentClass={ControlLabel}>
          <div className="links-label">Links</div>
        </Col>
        <Col sm={10} className="table-container">
          <OurTable
            colNames={['Link URL', 'Display Name']}
            setLinkData={this.handleFormInput.bind(this, 'links')}
          />
        </Col>

        <div className="jank-spacer" />

        <FieldGroup
          inputType="checklist"
          options={this.props.stories}
          label="Stories"
          onClick={this.handleFormInput.bind(this, 'stories')}
        />

        <FormControl.Feedback />

        <div className="end-buttons">
          <button
            className="button button--dark end-button"
            onClick={this.onCancel}
          >
            Cancel
          </button>
          <button
            className="button button--dark end-button"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </div>
      </Form>
    )
  }
}

export default POIForm
