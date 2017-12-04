import React, { Component } from 'react'
import { FormControl, Form, PageHeader } from 'react-bootstrap'
import moment from 'moment'
import { FieldGroup } from '../components'
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
      storiesToAdd: []
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onStorySelect = this.onStorySelect.bind(this)
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
    const { selectedMap, clickedCoords, loadPOIs, setShowPOIForm } = this.props
    const { name, description, startDate } = this.state
    const [coordinateX, coordinateY] = clickedCoords

    if (name === '' || description === '') {
      console.warn('Warning: empty fields!')
    }
    const poi = {
      title: name,
      map_by_year: selectedMap.year,
      description,
      date: startDate,
      coordinateX,
      coordinateY,
      links: ['google.com', 'purple.com']
    }

    // TODO: once the api sends the newly created POI,
    //       we have to set it as the selectedEvent
    Api.postPOI(poi)
      .then(res => console.log(res))
      .then(() => loadPOIs())
      .then(() => {
        setShowPOIForm(false)
      })
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
        />

        <FieldGroup
          controlId="links"
          label="POI Links"
          inputType="textarea"
          placeholder="Enter related links here, separated by commas"
        />

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
