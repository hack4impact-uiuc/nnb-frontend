import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { Icon, GetStorySearchResults } from './'

class StoryForm extends Component {
  onStoryNameEdit = e => {
    this.props.updateStoryNameInput(e.target.value)
  }

  onSelectPoi = poi => {
    const { selectedPois, updateSelectedPois } = this.props
    if (!selectedPois.some(p => p.id === poi.id)) {
      updateSelectedPois([...selectedPois, poi])
    }
  }

  removeInputPoi = poi => {
    const { selectedPois, updateSelectedPois } = this.props
    updateSelectedPois(selectedPois.filter(p => p.id !== poi.id))
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
      updateSelectedPois
    } = this.props
    hideStoryForm()
    setEditingStoryId(null)
    updateStoryNameInput('')
    updateSelectedPois([])
  }

  onSubmit = () => {
    const {
      inputStoryName,
      editingStoryId,
      createStory,
      updateStory,
      selectedPois
    } = this.props

    const story = { name: inputStoryName, poiIds: selectedPois.map(p => p.id) }

    if (editingStoryId) {
      updateStory(editingStoryId, story)
    } else {
      createStory(story)
    }

    this.props.exitStoryModal()
    this.onHide()
  }

  render() {
    const { inputStoryName, selectedPois } = this.props

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
        <div className="story-form__poi-list-container">
          <div className="story-form__search-bar">
            <h4 className="story-form__search-title">Search POIs to add:</h4>
            <GetStorySearchResults handleSelect={this.onSelectPoi} />
          </div>
          <div className="story-form__poi-list">
            <h4>POIs in story:</h4>
            {selectedPois.map(poi => {
              return (
                <div key={poi.id} className="story-form__added-pois">
                  {poi.name}
                  <Icon
                    type="Trash"
                    size="small"
                    className="story-form__added-pois__delete-icon"
                    onClick={() => this.removeInputPoi(poi)}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <button
          className="button button--dark button--full-width story-form__submit-button"
          onClick={this.onSubmit}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default StoryForm
