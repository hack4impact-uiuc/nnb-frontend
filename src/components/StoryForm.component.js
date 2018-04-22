import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { Icon, GetStorySearchResults } from './'

class StoryForm extends Component {
  constructor() {
    super()
    this.state = {
      poiNames: []
    }
  }

  onStoryNameEdit = e => {
    this.props.updateStoryNameInput(e.target.value)
  }

  onSelectPoi = poi => {
    if (!this.props.inputPois.some(p => p.id === poi.id)) {
      this.props.updatePoisInput([...this.props.inputPois, poi])
    }
  }

  removeInputPoi = poi => {
    this.props.updatePoisInput(this.props.inputPois.filter(p => p.id != poi.id))
  }

  closeStoryForm = () => {
    this.props.exitStoryModal()
    this.onHide()
  }

  onHide = () => {
    const {
      hideStoryForm,
      setEditingStoryId,
      updateStoryNameInput,
      updatePoisInput
    } = this.props
    hideStoryForm()
    setEditingStoryId(null)
    updateStoryNameInput('')
    updatePoisInput([])
  }

  onSubmit = () => {
    const {
      inputStoryName,
      editingStoryId,
      createStory,
      updateStory,
      inputPois
    } = this.props

    const story = { name: inputStoryName, poiIds: inputPois.map(p => p.id) }

    if (editingStoryId) {
      updateStory(editingStoryId, story)
    } else {
      createStory(story)
    }

    this.props.exitStoryModal()
    this.onHide()
  }

  render() {
    const { inputStoryName, inputPois } = this.props

    return (
      <div className="story-form">
        <div className="story-form__heading">
          <h4>Enter Story Name:</h4>
          <Icon
            type="X"
            size="small"
            className="story-form__exit"
            onClick={this.closeStoryForm}
          />
        </div>

        <div className="story-form__input">
          <FormControl
            type="text"
            value={inputStoryName}
            placeholder="Enter text"
            onChange={this.onStoryNameEdit}
          />
        </div>

        <h4>POIs:</h4>
        <GetStorySearchResults handleSelect={this.onSelectPoi} />

        <div>
          Added
          {inputPois.map(poi => {
            return (
              <li key={poi.id} onClick={() => this.removeInputPoi(poi)}>
                {poi.name}
              </li>
            )
          })}
        </div>

        <button
          className="button button--light button--full-width"
          onClick={this.onSubmit}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default StoryForm
