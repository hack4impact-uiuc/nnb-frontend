import React, { Component } from 'react'
import { FieldGroup } from '../components'
import { Button } from 'react-bootstrap'
import moment from 'moment'

export default class GetStories extends Component {
  render() {
    const { stories, loadStories } = this.props
    return (
      <div>
        <Button onClick={loadStories}>Get Stories</Button>
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
