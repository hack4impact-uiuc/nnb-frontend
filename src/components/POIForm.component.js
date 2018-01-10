import React, { Component } from 'react'
import { FormControl, Form, PageHeader } from 'react-bootstrap'
import moment from 'moment'
import { isEqual } from 'lodash'
import classnames from 'classnames'
import { FieldGroup, OurTable } from '../components'
import { Api } from './../utils'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/App.css'
import './../styles/poi-form.css'
import './../styles/button.css'

class POIForm extends Component {
  constructor(props) {
    super(props)
    const emptyState = {
      startDate: moment('1/1/' + this.props.selectedMap.year),
      name: '',
      description: '',
      stories: [],
      isUploadingMedia: false,
      content: [],
      links: [],
      shouldShowFormValidation: false
    }
    const { content, description, links, name, date } = this.props.selectedEvent
    const updatePOIState = {
      content,
      description,
      links,
      name,
      startDate: moment(date)
      // TODO: get stories that POI is in
      // stories:
    }
    this.state = this.props.isUpdatingPOI ? updatePOIState : emptyState
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onImageUpload = this.onImageUpload.bind(this)
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleYoutubeInput = this.handleYoutubeInput.bind(this)
    this.addYoutube = this.addYoutube.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.selectedEvent, this.props.selectedEvent)) {
      this.setState({ ...nextProps.selectedEvent })
    }
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

  // Multiple file upload is kinda jank since it sets
  // this.state.isUploadingMedia to false when the first image is uploaded.
  // A better approach would wrap each upload into a promise and use Promise.All
  onImageUpload(e) {
    const uploadedFiles = e.target.files
    if (uploadedFiles.length) {
      this.setState({ isUploadingMedia: true })
      const files = [...uploadedFiles]
      files.forEach(file => {
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
        reader.readAsDataURL(file)
      })
    }
  }

  handleYoutubeInput(e) {
    const url = e.target.value
    this.setState(
      {
        youtubeUrl: url
      },
      () => this.props.updatePOI(this.state)
    )
  }

  addYoutube() {
    const youtubeVideoId = parseYoutubeUrl(this.state.youtubeUrl)
    this.setState(
      {
        content: [...this.state.content, youtubeVideoId],
        youtubeUrl: ''
      },
      () => this.props.updatePOI(this.state)
    )
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
      alert('Media is currently uploading. Please wait.')
      return
    }

    if (name === '' || description === '' || !startDate) {
      this.setState({ shouldShowFormValidation: true })
      return
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
      .catch(() => {
        this.setState({ shouldShowFormValidation: true })
      })
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

  fileUpload() {
    const { isUploadingMedia, youtubeUrl } = this.state
    return (
      <div>
        <FieldGroup
          controlID="chooseFile"
          label="Upload Files"
          inputType="file"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          onChange={this.onImageUpload}
        />
        {isUploadingMedia && <div>Uploading...</div>}
        <FieldGroup
          controlID="youtube"
          label="Youtube"
          inputType="text"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          placeholder="Enter Youtube video url here"
          value={youtubeUrl}
          onChange={this.handleYoutubeInput}
          validationState={
            !!youtubeUrl && !parseYoutubeUrl(youtubeUrl) ? 'error' : null
          }
        />
        <button
          className={classnames('button', 'button--dark', {
            'button--disabled': !parseYoutubeUrl(youtubeUrl)
          })}
          onClick={this.addYoutube}
          disabled={!parseYoutubeUrl(youtubeUrl)}
        >
          Add Youtube Video
        </button>
      </div>
    )
  }

  render() {
    const {
      startDate,
      name,
      description,
      shouldShowFormValidation
    } = this.state

    return (
      <Form className="poi-form">
        <PageHeader>Create POI</PageHeader>

        <FieldGroup
          controlID="name"
          label="Name"
          inputType="text"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          placeholder="Enter POI name here"
          onChange={this.handleFormInput.bind(this, 'name')}
          validationState={shouldShowFormValidation && !name ? 'error' : null}
        />

        <FieldGroup
          inputType="date"
          label="Date"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          selected={startDate}
          onChange={this.handleFormInput.bind(this, 'date')}
          validationState={
            shouldShowFormValidation && !startDate ? 'error' : null
          }
        />

        <FieldGroup
          controlID="description"
          label="Description"
          inputType="textarea"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          placeholder="Enter POI description here"
          value={description}
          onChange={this.handleFormInput.bind(this, 'description')}
          validationState={
            shouldShowFormValidation && !description ? 'error' : null
          }
        />

        {this.fileUpload()}

        <div className="poi-form__our-table-container">
          <div className="poi-form__label">Links</div>
          <OurTable
            colNames={['Link URL', 'Display Name']}
            setLinkData={this.handleFormInput.bind(this, 'links')}
            shouldShowFormValidation={shouldShowFormValidation}
          />
        </div>

        <FieldGroup
          inputType="checklist"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          options={this.props.stories}
          label="Add To Stories"
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

// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
function parseYoutubeUrl(url) {
  if (!url) return false
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}
