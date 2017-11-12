import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  InputGroup
} from 'react-bootstrap'
import { Checkbox, Form, Col, PageHeader } from 'react-bootstrap'
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

  render() {
    return (
      <Form horizontal>
        <PageHeader>
          POI Input Form
          <small>Complete each component below</small>
        </PageHeader>
        <FormGroup controlId="name">
          <Col componentClass={ControlLabel} sm={2}>
            POI Name
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder="Enter your POI name here"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </Col>
        </FormGroup>

        {/*datepicker goes here*/}
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

        <FormGroup controlID="description">
          <Col componentClass={ControlLabel} sm={2}>
            POI description
          </Col>
          <Col sm={10}>
            <FormControl
              componentClass="textarea"
              placeholder="Enter you POI description here"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </Col>
        </FormGroup>

        {/*<FieldGroup
          id="formControlsFile"
          type="file"
          label="File"
          help="Example block-level help text here."
        />*/}

        <FormGroup controlID="links">
          <Col componentClass={ControlLabel} sm={2}>
            POI Links
          </Col>
          <Col sm={10}>
            <FormControl
              componentClass="textarea"
              placeholder="Enter related links here, separated by commas"
              value={this.state.links}
              onChange={this.onChangeLinks}
            />
          </Col>
        </FormGroup>

        <FormGroup controlID="stories">
          <Col smOffset={2} sm={10}>
            <Checkbox>Story 1</Checkbox>
            <Checkbox>Story 2</Checkbox>
            <Checkbox>Story 3</Checkbox>
          </Col>
        </FormGroup>

        <FormControl.Feedback />

        <FormGroup controlID="submit">
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" type="submit">
              Create
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default POIForm
