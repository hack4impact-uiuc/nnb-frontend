import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Checkbox,
  Form,
  Col,
  PageHeader
} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
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
    const { clickedCoords, loadPOIs, setShowPOIForm } = this.props
    const { name, description, startDate } = this.state
    const [coordinateX, coordinateY] = clickedCoords

    if (name === '' || description === '') {
      console.warn('Warning: empty fields!')
    }
    const poi = {
      title: name,
      description,
      date: startDate,
      coordinateX,
      coordinateY,
      links: ['google.com', 'purple.com']
    }

    // TODO: once the api sends the newly created POI,
    //       we have to set it as the selectedEvent
    Api.postPOI(poi)
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

function FieldGroup({
  controlId, //indentifier
  label,
  inputType, //text vs. textarea vs. file
  placeholder,
  value,
  selected,
  onChange,
  onClick,
  stories,
  buttonText,
  onStorySelect
}) {
  let fieldGroupModule

  switch (inputType) {
    case 'text':
      fieldGroupModule = (
        <FormControl
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )
      break
    case 'textarea':
      fieldGroupModule = (
        <FormControl
          componentClass="textarea"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )
      break
    case 'file':
      fieldGroupModule = <FormControl type="file" placeholder={placeholder} />
      break
    case 'date':
      fieldGroupModule = <DatePicker selected={selected} onChange={onChange} />
      break
    case 'button':
      fieldGroupModule = (
        <Button bsStyle="primary" onClick={onClick}>
          {buttonText}
        </Button>
      )
      break
    case 'checklist':
      fieldGroupModule = stories.map(story => (
        <div key={story.id}>
          <Checkbox onClick={() => onStorySelect(story.id)}>
            {story.name}
          </Checkbox>
        </div>
      ))
      break
    default:
      fieldGroupModule = (
        <div>
          <h1>
            Please choose a valid inputType: text, textarea, file, date, button,
            or checklist
          </h1>
        </div>
      )
  }

  return (
    <FormGroup controlid={controlId}>
      <Col sm={2} componentClass={ControlLabel}>
        {label}
      </Col>
      <Col sm={10}>{fieldGroupModule}</Col>
    </FormGroup>
  )
}

export default POIForm
