import React, { Component } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import Sidebar from 'react-sidebar'
import './../styles/storylist.css'

class StoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addStorySelected: false,
      storyName: ''
    }

    this.addStoryClicked = this.addStoryClicked.bind(this)
    this.addStoryExit = this.addStoryExit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitStoryName = this.submitStoryName.bind(this)
  }

  addStoryClicked() {
    this.setState({ addStorySelected: true })
  }

  addStoryExit() {
    this.setState({ addStorySelected: false })
  }

  handleChange(e) {
    this.setState({ storyName: e.target.value })
  }

  submitStoryName() {
    this.setState({
      addStorySelected: false,
      storyName: ''
    })
    //make api call here maybe?
  }

  render() {
    const stories = this.props.stories

    const sidebarContent = (
      <SidebarContent
        {...this.props}
        addStorySelected={this.state.addStorySelected}
        storyName={this.state.storyName}
        stories={stories}
        addStoryClicked={this.addStoryClicked}
        addStoryExit={this.addStoryExit}
        handleChange={this.handleChange}
        submitStoryName={this.submitStoryName}
      />
    )

    const sidebarProps = {
      sidebar: sidebarContent,
      open: this.props.showSidebar,
      sidebarClassName: 'sidebar',
      children: ''
    }

    return (
      <div>
        <Sidebar {...sidebarProps} />
      </div>
    )
  }
}

function SidebarContent({
  addStorySelected,
  storyName,
  stories,
  addStoryClicked,
  addStoryExit,
  handleChange,
  submitStoryName,
  ...props
}) {
  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-title">Story List</h2>
        <div className="exit" onClick={props.toggleSidebar}>
          X
        </div>
      </div>
      <div className="divider" />

      {stories.map(story => (
        <div key={story.id}>
          <a href="" className="sidebar-link">
            {story.name}
          </a>
          <div className="divider" />
        </div>
      ))}

      {props.isEditing &&
        !addStorySelected && (
          <Button onClick={addStoryClicked}>Add Story</Button>
        )}

      {props.isEditing &&
        addStorySelected && (
          <div>
            <h3 className="sidebar-title">Enter Story Name:</h3>
            <div className="exit" onClick={addStoryExit}>
              X
            </div>

            <FormControl
              type="text"
              value={storyName}
              placeholder="Enter text"
              onChange={handleChange}
            />

            <Button onClick={submitStoryName}>Submit</Button>
          </div>
        )}
    </div>
  )
}

export default StoryList
