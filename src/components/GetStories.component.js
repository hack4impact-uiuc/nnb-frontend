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
      editStory,
      deleteStory
    } = this.props
    const storyDummy = {
      storyName: 'Testing testing 1 2 3'
    }
    return (
      <div>
        <Button onClick={getStories}>Get Stories</Button>
        <br />
        {stories.stories.map(story => (
          <li>
            Story ID: {story.id}, Name: {story.name}
          </li>
        ))}
        <br />
      </div>
    )
  }
}
