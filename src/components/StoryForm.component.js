import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { Icon } from './'

class StoryForm extends Component {
  onSubmit = () => {
    const {
      inputStoryName,
      editingStoryId,
      createStory,
      updateStory
    } = this.props

    const story = { name: inputStoryName }

    if (editingStoryId) {
      updateStory(editingStoryId, story)
    } else {
      createStory(story)
    }
  }

  render() {
    const { inputStoryName, hideStoryForm, updateStoryNameInput } = this.props

    return (
      <div className="story-form">
        <div className="story-form__heading">
          <h4>Enter Story Name:</h4>
          <Icon
            type="X"
            size="small"
            className="story-form__exit"
            onClick={hideStoryForm}
          />
        </div>

        <div className="story-form__input">
          <FormControl
            type="text"
            value={inputStoryName}
            placeholder="Enter text"
            onChange={e => updateStoryNameInput(e.target.value)}
          />
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
