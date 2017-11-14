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
import 'react-datepicker/dist/react-datepicker.css'

class POIForm extends Component {
  constructor(props) {
    super(props)
    this.onDateSelected = this.onDateSelected.bind(this)
    this.state = {
      startDate: moment(),
      name: '',
      description: '',
      selectedStories: [],
      links: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeLinks = this.onChangeLinks.bind(this)
    /*this.onClickPlus = this.onClickPlus.bind(this)*/
    this.onSubmit = this.onSubmit.bind(this)
  }

  onDateSelected() {
    // call this when date input changes
  }

  handleChange(date) {
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

  /*onClickPlus() {
    this.setState({
      links : this.state.links.concat(
        ["1"]
      )
    });
  }*/

  onChangeLinks(inputLinks) {
    this.setState({
      links: inputLinks.target.value
    })
  }

  onSubmit() {}

  render() {
    const stories = this.props.stories

    return (
      <Form horizontal>
        <PageHeader>
          POI Input Form
          <small> Complete each component below</small>
        </PageHeader>

        {/*
          *********THIS IS MY POI NAME***********
        */}
        <FieldGroup
          controlID="name"
          label="POI Name"
          inputType="text"
          helperText="Enter your POI name here"
          thisValue={this.state.name}
          thisChange={this.onChangName}
        />

        {/*
          *********THIS IS MY DATEPICKER***********
        */}
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            POI Date
          </Col>
          <Col sm={6}>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>

        {/*
          *********THIS IS MY DESCRIPTION AREA***********
        */}
        <FieldGroup
          controlID="description"
          label="POI Description"
          inputType="textarea"
          helperText="Enter your POI description here"
          thisValue={this.state.description}
          thisChange={this.onChangeDescription}
        />

        {/*
          *********THIS IS MY UPLOAD BUTTON***********
        */}
        <FieldGroup
          controlID="chooseFile"
          label="Upload Media"
          inputType="file"
          helperText="Upload your files here"
        />

        <FieldGroup
          controlId="links"
          label="POI Links"
          inputType="textarea"
          helperText="Enter related links here, separated by commas"
          thisValue={this.state.links}
          thisChange={this.onChangeLinks}
        />

        {/*
          *********THIS IS MY LIST OF STORY CHECKBOXES***********
        */}
        <FormGroup controlid="stories">
          <Col componentClass={ControlLabel} sm={2}>
            Stories
          </Col>
          <Col sm={10}>
            {stories.map(story => (
              <div key={story.id}>
                <Checkbox>{story.name}</Checkbox>
              </div>
            ))}
          </Col>
        </FormGroup>
        <FormControl.Feedback />

        {/*
          *********THIS IS MY SUBMIT BUTTON***********
        */}
        <FormGroup controlid="submit">
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" type="submit" onClick={this.onSubmit}>
              Create
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

function FieldGroup({
  controlId, //indentifier
  label,
  inputType, //text vs. textarea vs. file
  helperText,
  thisValue,
  thisChange
}) {
  var fieldGroupModule

  if (inputType === 'text') {
    fieldGroupModule = (
      <FormControl
        type="text"
        placeholder={helperText}
        value={thisValue}
        onChange={thisChange}
      />
    )
  } else if (inputType === 'textarea') {
    fieldGroupModule = (
      <FormControl
        componentClass="textarea"
        placeholder={helperText}
        value={thisValue}
        onChange={thisChange}
      />
    )
  } else if (inputType === 'file') {
    fieldGroupModule = <FormControl type="file" placeholder={helperText} />
  }

  return (
    <FormGroup controlid={controlId}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={10}>{fieldGroupModule}</Col>
    </FormGroup>
  )
}

export default POIForm
