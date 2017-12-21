import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import Sidebar from 'react-sidebar'
import { X, Trash2 as Trash, Edit2 as Edit } from 'react-feather'
import { Api } from './../utils'
import './../styles/storylist.css'
import './../styles/App.css'
import './../styles/button.css'
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
    console.log('Edit Button #' + id)
  }

  onClickDelete(id) {
    const { loadStories, exitStory, selectedStory } = this.props
    if (
      window.confirm(
        'Delete the current story? This will permanently remove the story from the story-list.'
      )
    ) {
      Api.deleteStory(id)
        .then(() => {
          if (id === selectedStory) {
            return exitStory()
          }
        })
        .then(() => loadStories())
    }
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
      <div className="sidebar__header">
        <h2 className="sidebar__title">Story List</h2>
        <div
          className="sidebar__exit feather-icon feather-icon--large"
          onClick={props.toggleSidebar}
        >
          <X size={25} />
        </div>
      </div>

      <div className="divider" />

      {stories.map(story => (
        <div onClick={() => props.setSelectedStory(story.id)} key={story.id}>
          <div
            className={classnames('story-item', {
              'story-item--selected': story.id === props.selectedStory
            })}
          >
            <div className="story-item__name">{story.name}</div>

            <div
              className="feather-icon feather-icon--small story-item__icon"
              onClick={() => onClickEdit(story.id)}
            >
              <Edit size={15} />
            </div>

            <div
              className="feather-icon feather-icon--small story-item__icon"
              onClick={() => onClickDelete(story.id)}
            >
              <Trash size={15} />
            </div>
          </div>

          <div className="divider" />
        </div>
      ))}

      {props.isEditing &&
        !addStorySelected && (
          <button className="button button--wide" onClick={addStoryClicked}>
            Add Story
          </button>
        )}

      {props.isEditing &&
        addStorySelected && (
          <div className="story-form">
            <div className="story-form__heading">
              <h4>Enter Story Name:</h4>
              <div
                className="story-form__exit feather-icon feather-icon--small"
                onClick={addStoryExit}
              >
                <X size={15} />
              </div>
            </div>

            <div className="story-form__input">
              <FormControl
                type="text"
                value={storyName}
                placeholder="Enter text"
                onChange={storyNameChange}
              />
            </div>

            <button className="button button--wide" onClick={submitStoryName}>
              Submit
            </button>
          </div>
        )}

      {props.isStorySelected && (
        <button
          className="button button--wide sidebar__exit-story"
          onClick={exitStory}
        >
          Exit Story
        </button>
      )}
    </div>
  )
}

export default StoryList
