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
import { Api } from './../utils'
import 'react-datepicker/dist/react-datepicker.css'

class MapForm extends Component {
  state = {
    mapImageUrl: '',
    mapYear: ''
  }

  constructor(props) {
    super(props)

    this.onChangeMapUrl = this.onChangeMapUrl.bind(this)
    this.onChangeYear = this.onChangeYear.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onChangeMapUrl(inputUrl) {
    this.setState({
      mapImageUrl: inputUrl.target.value
    })
  }

  onChangeYear(inputYear) {
    this.setState({
      mapYear: inputYear.target.value
    })
  }

  onSubmit() {
    const { loadMaps, setShowMapForm } = this.props
    const { mapImageUrl, mapYear } = this.state

    if (mapImageUrl === '' || mapYear === '') {
      console.warn('Warning: empty fields!')
    }
    const map = {
      imageUrl: mapImageUrl,
      year: mapYear
    }

    Api.postMap(map)
      .then(() => loadMaps())
      .then(() => {
        setShowMapForm(false)
      })
  }

  onCancel() {
    this.setState({
      mapImageUrl: '',
      mapYear: ''
    })
    this.props.setShowMapForm(false)
  }

  render() {
    return (
      <Form horizontal>
        <PageHeader>Create Map</PageHeader>

        <FieldGroup
          controlID="year"
          label="Map Year"
          inputType="text"
          placeholder="Enter your map year here"
          value={this.state.mapYear}
          onChange={this.onChangeYear}
        />

        <FieldGroup
          controlID="url"
          label="Map Image URL"
          inputType="text"
          placeholder="Enter your map image URL here"
          value={this.state.mapImageUrl}
          onChange={this.onChangeMapUrl}
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

export default MapForm
