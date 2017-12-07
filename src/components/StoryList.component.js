import React, { Component } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import Sidebar from 'react-sidebar'
import { Api } from './../utils'
import './../styles/storylist.css'
import classnames from 'classnames'

class StoryList extends Component {
  state = {
    addStorySelected: false,
    storyName: ''
  }

  constructor(props) {
    super(props)
    this.addStoryClicked = this.addStoryClicked.bind(this)
    this.addStoryExit = this.addStoryExit.bind(this)
    this.storyNameChange = this.storyNameChange.bind(this)
    this.submitStoryName = this.submitStoryName.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
  }

  addStoryClicked() {
    this.setState({ addStorySelected: true })
  }

  addStoryExit() {
    this.setState({ addStorySelected: false })
  }

  storyNameChange(e) {
    this.setState({ storyName: e.target.value })
  }

  onClickEdit(id) {
    alert('Edit Button #' + id)
  }

  onClickDelete(id) {
    //<--TODO: Add delete message
    alert('Delete Button #' + id)
  }

  submitStoryName() {
    Api.postStory(this.state.storyName)
      .then(() => this.props.loadStories())
      .then(() => {
        this.setState({
          addStorySelected: false,
          storyName: ''
        })
      })
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
        storyNameChange={this.storyNameChange}
        submitStoryName={this.submitStoryName}
        exitStory={this.props.exitStory}
        onClickEdit={this.onClickEdit}
        onClickDelete={this.onClickDelete}
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
  storyNameChange,
  submitStoryName,
  exitStory,
  onClickEdit,
  onClickDelete,
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
          <div
            className={classnames('sidebar-link', {
              'sidebar-link--selected': story.id === props.selectedStory
            })}
          >
            {story.name}
          </div>

          <div onClick={() => onClickEdit(story.id)}>Edit</div>
          <div onClick={() => onClickDelete(story.id)}>Delete</div>

          <div className="divider" />
        </div>
      ))}

      {props.isStorySelected && <Button onClick={exitStory}>Exit Story</Button>}

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
              onChange={storyNameChange}
            />

            <Button onClick={submitStoryName}>Submit</Button>
          </div>
        )}
    </div>
  )
}

export default StoryList
