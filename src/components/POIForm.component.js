import React, { Component } from 'react'
import { FormControl, Form, PageHeader } from 'react-bootstrap'
import moment from 'moment'
import { isEqual } from 'lodash'
import classnames from 'classnames'
import { FieldGroup, OurTable } from '../components'
import { Api, utils } from './../utils'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/App.css'
import './../styles/poi-form.css'
import './../styles/button.css'

class POIForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment('1/1/' + this.props.selectedMap.year).utc(),
      name: '',
      description: '',
      stories: [],
      isUploadingMedia: false,
      content: [],
      links: [],
      shouldShowFormValidation: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onImageUpload = this.onImageUpload.bind(this)
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleYoutubeInput = this.handleYoutubeInput.bind(this)
    this.addYoutube = this.addYoutube.bind(this)
    this.onPOIEditSubmit = this.onPOIEditSubmit.bind(this)
    this.enableFormValidation = this.enableFormValidation.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.selectedEvent, this.props.selectedEvent)) {
      this.setState({
        ...nextProps.selectedEvent,
        [!!nextProps.selectedEvent && 'date']: moment(
          nextProps.selectedEvent ? nextProps.selectedEvent.date : undefined
        ).utc()
      })
    }
  }

  componentDidMount() {
    const { isUpdatingPOI, selectedEvent } = this.props
    if (isUpdatingPOI && selectedEvent) {
      const requests = [
        Api.loadPOI(selectedEvent.id),
        Api.loadStories(selectedEvent.id)
      ]
      Promise.all(requests).then(responses => {
        const [poi, stories] = responses
        this.setState(
          {
            ...poi,
            links: poi.links.map(link => [link.url, link.urlName]),
            date: moment(poi.date).utc(),
            stories: stories.map(s => s.id)
          },
          () => this.props.updatePOI(this.state)
        )
      })
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
        date: moment().utc(),
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
    const youtubeVideoId = utils.parseYoutubeUrl(this.state.youtubeUrl)
    this.setState(
      {
        content: [...this.state.content, youtubeVideoId],
        youtubeUrl: ''
      },
      () => this.props.updatePOI(this.state)
    )
  }

  onPOIEditSubmit() {
    const {
      selectedMap,
      loadPOIsForYear,
      setShowPOIForm,
      setSelectedPOI,
      setIsUpdatingPOI
    } = this.props

    const {
      content,
      coordinateX,
      coordinateY,
      description,
      id,
      isUploadingMedia,
      links,
      name,
      date,
      stories
    } = this.state

    if (isUploadingMedia) {
      alert('Media is currently uploading. Please wait.')
      return
    }

    if (name === '' || description === '' || !date) {
      this.setState({ shouldShowFormValidation: true })
      return
    }

    const poi = {
      content: content.map(contentUrl => ({
        contentUrl: contentUrl.contentUrl ? contentUrl.contentUrl : contentUrl,
        caption: 'caption'
      })),
      coordinateX,
      coordinateY,
      date,
      description,
      // id,
      links: links.map(linkTuple => ({
        url: utils.validateLink(linkTuple[0]),
        urlName: linkTuple[1]
      })),
      mapByYear: selectedMap.year,
      name,
      stories
    }

    Api.updatePOI(id, poi)
      .then(() =>
        loadPOIsForYear(selectedMap.year).then(() => setSelectedPOI(id))
      )
      .then(() => setIsUpdatingPOI(false))
      .then(() => setShowPOIForm(false))
      .catch(() => {
        this.setState({ shouldShowFormValidation: true })
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
      date,
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

    if (name === '' || description === '' || !date) {
      this.setState({ shouldShowFormValidation: true })
      return
    }

    const poi = {
      name,
      mapByYear: selectedMap.year,
      description,
      date,
      coordinateX,
      coordinateY,
      links: links.map(linkTuple => ({
        url: utils.validateLink(linkTuple[0]),
        urlName: linkTuple[1]
      })),
      content,
      // content: content.map(contentUrl => ({
      //   contentUrl: contentUrl,
      //   caption: 'caption'
      // })),
      stories
    }

    Api.createPOI(poi)
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
    this.props.setIsUpdatingPOI(false)
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

  enableFormValidation(shouldShowFormValidation) {
    this.setState({
      shouldShowFormValidation
    })
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
          multipleFileUpload={true}
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
            !!youtubeUrl && !utils.parseYoutubeUrl(youtubeUrl) ? 'error' : null
          }
        />
        <button
          className={classnames('button', 'button--dark', {
            'button--disabled': !utils.parseYoutubeUrl(youtubeUrl)
          })}
          onClick={this.addYoutube}
          disabled={!utils.parseYoutubeUrl(youtubeUrl)}
          type="button"
        >
          Add Youtube Video
        </button>
      </div>
    )
  }

  render() {
    const { isUpdatingPOI } = this.props
    const {
      date,
      name,
      description,
      links,
      shouldShowFormValidation
    } = this.state

    return (
      <Form className="poi-form">
        <PageHeader>{isUpdatingPOI ? 'Edit' : 'Create'} POI</PageHeader>

        <FieldGroup
          controlID="name"
          label="Name"
          inputType="text"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          placeholder="Enter POI name here"
          value={name}
          onChange={this.handleFormInput.bind(this, 'name')}
          validationState={shouldShowFormValidation && !name ? 'error' : null}
        />

        <FieldGroup
          inputType="date"
          label="Date"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          selected={date}
          onChange={this.handleFormInput.bind(this, 'date')}
          validationState={shouldShowFormValidation && !date ? 'error' : null}
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
            data={links}
            isUpdatingPOI={isUpdatingPOI}
            enableFormValidation={this.enableFormValidation}
          />
        </div>

        <FieldGroup
          inputType="checklist"
          className="poi-form__field-group specifier"
          labelClassName="poi-form__label"
          options={this.props.stories}
          label="Add To Stories"
          onClick={this.handleFormInput.bind(this, 'stories')}
          checkedOptionIds={this.state.stories}
        />

        <FormControl.Feedback />

        <div className="end-buttons">
          <button
            className="button button--dark end-button"
            onClick={this.onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="button button--dark end-button"
            onClick={
              this.props.isUpdatingPOI ? this.onPOIEditSubmit : this.onSubmit
            }
            type="button"
          >
            Submit
          </button>
        </div>
      </Form>
    )
  }
}

export default POIForm
