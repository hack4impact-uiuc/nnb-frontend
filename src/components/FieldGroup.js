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
  controlId, //indentifier
  label,
  inputType, //{text,textarea,file,date,button,checklist}
  placeholder,
  value,
  selected,
  onChange,
  onClick,
  stories,
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

export default FieldGroup
