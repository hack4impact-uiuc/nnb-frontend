import React, { Component } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import Sidebar from 'react-sidebar'
import './../styles/storylist.css'

class StoryList extends Component {
  state = {
    addStorySelected: false,
    storyName: ''
  }

  constructor(props) {
    super(props)
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

    return (
      <div>
        <Sidebar
          sidebar={sidebarContent}
          open={this.props.showSidebar}
          sidebarClassName="sidebar"
          children=""
          touchHandleWidth={0}
          styles={{
            root: {
              position: 'static'
            },
            content: {
              position: 'static'
            },
            sidebar: {
              zIndex: 3
            }
          }}
        />
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
        <div onClick={() => props.setSelectedStory(story.id)} key={story.id}>
          <div className="sidebar-link">{story.name}</div>
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
