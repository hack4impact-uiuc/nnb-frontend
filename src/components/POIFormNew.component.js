import React, { Component } from 'react'
import { FieldGroup, LinkTable } from './'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/App.css'
import './../styles/poi-form.css'
import './../styles/button.css'

export default class POIForm extends Component {
  // temp just to have the data loaded
  componentDidMount() {
    const { loadMaps, loadPOIsByMapYear, loadStories } = this.props
    loadMaps().then(action => {
      loadPOIsByMapYear(action.payload[0].year)
    })
    loadStories()
  }

  render() {
    const {
      stories,
      name,
      date,
      description,
      storyIds,
      media,
      links,
      clipboard,
      updatePOIFormInput,
      togglePOIFormStoryId,
      addPOIFormLink,
      removePOIFormLink,
      addPOIFormMedia,
      removePOIFormMedia,
      pastePOIFormPOI
    } = this.props
    return (
      <div>
        <button disabled={clipboard.length === 0} type="button">
          Paste
        </button>
        <select>{clipboard.map(poi => <div>{poi.id}</div>)}</select>
        <form>
          <FieldGroup
            controlID="name"
            label="Name"
            inputType="text"
            className="poi-form__field-group specifier"
            labelClassName="poi-form__label"
            placeholder="Enter POI name here"
            value={name}
            onChange={e => updatePOIFormInput('name', e.target.value)}
          />
          <FieldGroup
            inputType="date"
            label="Date"
            className="poi-form__field-group specifier"
            labelClassName="poi-form__label"
            selected={date}
            onChange={date => updatePOIFormInput('date', date)}
          />
          <FieldGroup
            controlID="description"
            label="Description"
            inputType="textarea"
            className="poi-form__field-group specifier"
            labelClassName="poi-form__label"
            placeholder="Enter POI description here"
            value={description}
            onChange={e => updatePOIFormInput('description', e.target.value)}
          />
          <LinkTable />
          <FieldGroup
            inputType="checklist"
            className="poi-form__field-group specifier"
            labelClassName="poi-form__label"
            options={stories}
            label="Add To Stories"
            onClick={togglePOIFormStoryId}
            checkedOptionIds={storyIds}
          />
        </form>
      </div>
    )
  }
}
