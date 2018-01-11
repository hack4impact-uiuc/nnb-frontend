import React from 'react'
import { FormGroup, FormControl, Checkbox } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/button.css'

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
  startYear,
  validationState,
  className,
  labelClassName,
  multipleFileUpload,
  disabled
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
      // TODO: style like a button
      fieldGroupModule = (
        <div>
          <label
            className="button button--dark button--file-upload"
            htmlFor="file-upload"
          >
            Upload
          </label>
          <FormControl
            type="file"
            id="file-upload"
            onChange={onChange}
            multiple={multipleFileUpload}
          />
        </div>
      )
      break
    case 'date':
      fieldGroupModule = (
        <DatePicker
          selected={selected}
          onChange={onChange}
          className="form-control"
        />
      )
      break
    case 'button':
      fieldGroupModule = (
        <button
          className="button button--dark"
          onClick={onClick}
          type="button"
          disabled={disabled}
        >
          {buttonText}
        </button>
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
    <FormGroup
      controlid={controlId}
      validationState={validationState}
      className={className}
    >
      <div className={labelClassName}>{label}</div>
      <div>{fieldGroupModule}</div>
    </FormGroup>
  )
}

export default FieldGroup
