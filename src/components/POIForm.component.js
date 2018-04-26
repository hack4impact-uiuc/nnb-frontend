import React, { Component } from 'react'
import classnames from 'classnames'
import { DropdownButton, Form, MenuItem, PageHeader } from 'react-bootstrap'
import { ROUTES } from './../'
import { FieldGroup, LinkTable } from './'
import { utils } from './../utils'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/App.css'
import './../styles/poi-form.css'
import './../styles/button.css'

export default class POIForm extends Component {
  // TODO: move to redux
  state = {
    isUploadingMedia: false,
    youtubeUrl: ''
  }

  // TODO: Multiple file upload is kinda jank since it sets
  // this.state.isUploadingMedia to false when the first image is uploaded.
  // A better approach would wrap each upload into a promise and use Promise.All
  // ORRRR use a counter in the redux store with how many media things are being uploaded
  // and set to false if it's 0
  onImageUpload = e => {
    const uploadedFiles = e.target.files
    if (uploadedFiles.length) {
      // TODO: move this to redux
      this.setState({ isUploadingMedia: true })
      const files = [...uploadedFiles]
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = e => {
          const dataURL = e.target.result
          this.props.addPOIFormMedia(dataURL)

          // dis da problem
          this.setState({ isUploadingMedia: false })
        }
        reader.readAsDataURL(file)
      })
    }
  }

  handleYoutubeInput = e => {
    const youtubeUrl = e.target.value
    this.setState({ youtubeUrl })
  }

  addYoutube = () => {
    const youtubeVideoId = utils.parseYoutubeUrl(this.state.youtubeUrl)
    this.props.addPOIFormYoutubeMedia(youtubeVideoId)
    this.setState({ youtubeUrl: '' })
  }

  fileUpload = () => {
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

  onExit = () => {
    this.props.history.push(ROUTES.INDEX)
  }

  onSubmit = () => {
    const {
      selectedPOIId,
      mapYear,
      xCoord,
      yCoord,
      name,
      date,
      description,
      storyIds,
      media,
      links,
      updatePOI,
      createPOI,
      authorizationToken
    } = this.props
    const poi = {
      mapYear,
      xCoord,
      yCoord,
      name,
      date,
      description,
      storyIds,
      media,
      links
    }
    if (selectedPOIId) {
      updatePOI(selectedPOIId, poi, authorizationToken)
    } else {
      createPOI(poi, authorizationToken)
    }
    this.onExit()
  }

  render() {
    const {
      stories,
      name,
      date,
      description,
      storyIds,
      clipboard,
      isUpdatingPOI,
      pastePOI,
      updatePOIFormInput,
      togglePOIFormStoryId
    } = this.props
    return (
      <div>
        <Form className="poi-form">
          <PageHeader>{isUpdatingPOI ? 'Edit' : 'Create'} POI</PageHeader>
          <DropdownButton
            className="button button--dark"
            title="Paste POI"
            disabled={clipboard.length === 0}
            id="paste-poi-dropdown"
          >
            {clipboard.map(elem => (
              <MenuItem key={elem.id} onClick={() => pastePOI(elem)}>
                {elem.name}
              </MenuItem>
            ))}
          </DropdownButton>
          <FieldGroup
            controlID="name"
            label="Name"
            inputType="text"
            className="poi-form__field-group specifier"
            labelClassName="poi-form__label"
            placeholder="Enter POI name here"
            value={name}
            onChange={e => updatePOIFormInput('name', e.target.value)}
          />
          <FieldGroup
            inputType="date"
            label="Date"
            className="poi-form__field-group specifier"
            labelClassName="poi-form__label"
            selected={date}
            onChange={date => updatePOIFormInput('date', date)}
          />
          <FieldGroup
            controlID="description"
            label="Description"
            inputType="textarea"
            className="poi-form__field-group specifier"
            labelClassName="poi-form__label"
            placeholder="Enter POI description here"
            value={description}
            onChange={e => updatePOIFormInput('description', e.target.value)}
          />
          {this.fileUpload()}
          <LinkTable />
          <FieldGroup
            inputType="checklist"
            className="poi-form__field-group specifier"
            labelClassName="poi-form__label"
            options={stories}
            label="Add To Stories"
            onClick={togglePOIFormStoryId}
            checkedOptionIds={storyIds}
          />

          <div className="end-buttons">
            <button
              className="button button--dark end-button"
              onClick={this.onExit}
              type="button"
            >
              Cancel
            </button>
            <button
              className="button button--dark end-button"
              onClick={this.onSubmit}
              type="button"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    )
  }
}
