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
      links: ''
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

  onSubmit() {}

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
          value={this.state.links}
          onChange={this.onChangeLinks}
        />

        <FieldGroup
          inputType="checklist"
          stories={this.props.stories}
          label="Stories"
        />

        <FormControl.Feedback />

        <FieldGroup
          inputType="button"
          label="Create"
          smOffset={2}
          sm={10}
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
  smOffset,
  sm,
  onClick,
  stories
}) {
  let fieldGroupModule
  if (inputType === 'date') {
    return (
      <FormGroup>
        <Col sm={2} componentClass={ControlLabel}>
          {label}
        </Col>
        <Col sm={6}>
          <DatePicker selected={selected} onChange={onChange} />
        </Col>
      </FormGroup>
    )
  } else if (inputType === 'button') {
    return (
      <FormGroup controlid="submit">
        <Col sm={sm} smOffset={smOffset}>
          <Button bsStyle="primary" type="submit" onClick={onClick}>
            {label}
          </Button>
        </Col>
      </FormGroup>
    )
  }

  if (inputType === 'text') {
    fieldGroupModule = (
      <FormControl
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )
  } else if (inputType === 'textarea') {
    fieldGroupModule = (
      <FormControl
        componentClass="textarea"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )
  } else if (inputType === 'file') {
    fieldGroupModule = <FormControl type="file" placeholder={placeholder} />
  } else if (inputType === 'checklist') {
    fieldGroupModule = stories.map(story => (
      <div key={story.id}>
        <Checkbox>{story.name}</Checkbox>
      </div>
    ))
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
