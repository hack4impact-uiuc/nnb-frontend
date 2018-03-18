import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'
import moment from 'moment'

export default class GetStories extends Component {
  state = { getStoryBy: '' }

  handleTextChange = event => {
    event.target.value.match(/^\d+(\.\d+)?$/)
      ? this.setState({ getStoryBy: Number(event.target.value) })
      : event.target.value === ''
        ? this.setState({ getStoryBy: event.target.value })
        : null
  }
  render() {
    const {
      stories,
      getStories,
      getStoriesByPOI,
      getStory,
      postStory,
      deleteStory
    } = this.props
    const storyDummy = {
      storyName: 'Testing testing 1 2 3'
    }
    return (
      <div>
        <FieldGroup
          controlId="getStoryBy"
          label="Enter POI ID or Story ID"
          inputType="text"
          value={this.state.getStoryBy}
          onChange={this.handleTextChange}
        />
        <Button onClick={getStories}>Get Stories</Button>
        <Button onClick={() => getStoriesByPOI(this.state.getStoryBy)}>
          Get Story by POI
        </Button>
        <Button onClick={() => getStory(this.state.getStoryBy)}>
          Get Story by Story ID
        </Button>
        <Button onClick={() => postStory(storyDummy.storyName)}>
          Add Story (dummy)
        </Button>
        <Button
          onClick={() => editStory(this.state.getStoryBy, storyDummy.storyName)}
        >
          Edit Story (dummy)
        </Button>
        <br />
        <br />
        {stories.stories.map(story => (
          <li>
            Story ID {story.storyId}: {story.storyName}
          </li>
        ))}
      </div>
    )
  }
}
