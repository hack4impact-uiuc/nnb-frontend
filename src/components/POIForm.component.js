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
      description: ''
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
    const { name, description, startDate } = this.state
    if (name === '' || description === '') {
      console.warn('Warning: empty fields!')
    }
    const poi = {
      title: name,
      description: description,
      date: startDate,
      coordinateX: this.props.clickedCoords[0],
      coordinateY: this.props.clickedCoords[1],
      links: ['google.com', 'purple.com']
    }

    // TODO: once the api sends the newly created POI,
    //       we have to set it as the selectedEvent
    Api.postPOI(poi)
      .then(() => this.props.loadPOIs())
      .then(() => {
        this.props.setShowPOIForm(false)
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
        />

        <FormControl.Feedback />

        <FieldGroup
          inputType="button"
          label=""
          buttonText="Create"
          onClick={this.onSubmit}
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
  buttonText
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
          <Checkbox>{story.name}</Checkbox>
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
