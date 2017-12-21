import React from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Checkbox,
  Col
} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function FieldGroup({
  // indentifier
  controlId,
  label,
  // { text, textarea, file, date, button, checklist }
  inputType,
  placeholder,
  value,
  selected,
  onChange,
  onClick,
  // expects an array containing objects of { id, name }. will be fed into checklists
  options,
  buttonText,
  onStorySelect,
  startYear
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
      fieldGroupModule = (
        <FormControl
          type="file"
          placeholder={placeholder}
          onChange={onChange}
        />
      )
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
      fieldGroupModule = options.map(option => (
        <div key={option.id}>
          <Checkbox onClick={() => onClick(option.id)}>{option.name}</Checkbox>
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

export default FieldGroup
