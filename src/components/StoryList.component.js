import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import Sidebar from 'react-sidebar'
import { Icon, GetEditStorySearchResults, EditStoryModal } from './'
import { Api } from './../utils'
import './../styles/storylist.css'
import './../styles/App.css'
import './../styles/button.css'
import classnames from 'classnames'

class StoryList extends Component {
  state = {
    addStorySelected: false,
    storyName: '',
    updateStoryId: null,
    poiToAdd: []
  }

  constructor(props) {
    super(props)
    this.addStoryClicked = this.addStoryClicked.bind(this)
    this.addStoryExit = this.addStoryExit.bind(this)
    this.storyNameChange = this.storyNameChange.bind(this)
    this.submitStoryName = this.submitStoryName.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
    this.updateStoryName = this.updateStoryName.bind(this)
    this.promptAndExitEditMode = this.promptAndExitEditMode.bind(this)
    this.onSelectPoi = this.onSelectPoi.bind(this)
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

  onClickEdit(story) {
    this.setState({ updateStoryId: story.id, storyName: story.name })
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

  onSelectPoi(event) {
    this.setState({
      poiToAdd: this.state.poiToAdd.concat([event.target.value])
    })
  }

  submitStoryName() {
    Api.createStory({
      name: this.state.storyName,
      poiIds: this.state.poiToAdd
    })
      .then(() => this.props.loadStories())
      .then(() => {
        this.setState({
          addStorySelected: false,
          storyName: ''
        })
      })
  }

  updateStoryName() {
    const { updateStoryId, storyName, poiToAdd } = this.state
    Api.updateStory(updateStoryId, { name: storyName, poiIds: poiToAdd })
      .then(() => this.props.loadStories())
      .then(() => {
        this.setState({
          storyName: '',
          updateStoryId: null
        })
      })
  }

  promptAndExitEditMode(storyId) {
    if (
      window.confirm(
        'Exit edit mode? Cannot be in edit mode while viewing a story.'
      )
    ) {
      this.props.toggleEditMode()
      this.props.setSelectedStory(storyId)
    }
  }

  render() {
    const stories = this.props.stories

    const sidebarContent = (
      <SidebarContent
        {...this.props}
        addStoryClicked={this.addStoryClicked}
        addStoryExit={this.addStoryExit}
        addStorySelected={this.state.addStorySelected}
        updateStoryId={this.state.updateStoryId}
        updateStoryName={this.updateStoryName}
        exitStory={this.props.exitStory}
        onClickDelete={this.onClickDelete}
        onClickEdit={this.onClickEdit}
        promptAndExitEditMode={this.promptAndExitEditMode}
        stories={stories}
        storyName={this.state.storyName}
        storyNameChange={this.storyNameChange}
        submitStoryName={this.submitStoryName}
        onSelectPoi={this.onSelectPoi}
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
              zIndex: 10
            }
          }}
        />
      </div>
    )
  }
}

function SidebarContent({
  addStoryClicked,
  addStoryExit,
  addStorySelected,
  updateStoryId,
  updateStoryName,
  exitStory,
  onClickDelete,
  onClickEdit,
  promptAndExitEditMode,
  stories,
  storyName,
  storyNameChange,
  submitStoryName,
  onSelectPoi,
  ...props
}) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">Story List</h2>
        <Icon
          type="X"
          size="large"
          onClick={props.toggleSidebar}
          className="sidebar__exit"
        />
      </div>

      <div className="divider" />

      {[...stories].sort((a, b) => a.name.localeCompare(b.name)).map(story => (
        <div key={story.id}>
          <div
            className={classnames('story-item', {
              'story-item--selected': story.id === props.selectedStory
            })}
          >
            {updateStoryId !== story.id && (
              <div
                className="story-item__name"
                onClick={() =>
                  props.isEditing
                    ? promptAndExitEditMode(story.id)
                    : props.setSelectedStory(story.id)}
              >
                {story.name}
              </div>
            )}
            {props.isEditing &&
              updateStoryId !== story.id && (
                <Icon
                  type="Edit"
                  size="small"
                  className="story-item__icon"
                  onClick={() => onClickEdit(story)}
                />
              )}
            {props.isEditing &&
              updateStoryId !== story.id && (
                <Icon
                  type="Trash"
                  size="small"
                  className="story-item__icon"
                  onClick={() => onClickDelete(story.id)}
                />
              )}
            {props.isEditing &&
              updateStoryId === story.id && (
                <div>
                  <EditStoryModal
                    toggleSidebar={props.toggleSidebar}
                    onSelectPoi={onSelectPoi}
                    updateStoryName={updateStoryName}
                    storyName={storyName}
                    storyNameChange={storyNameChange}
                  />
                </div>
              )}
          </div>

          <div className="divider" />
        </div>
      ))}

      {props.isEditing &&
        !addStorySelected && (
          <button
            className="button button--light button--full-width"
            onClick={addStoryClicked}
          >
            Add Story
          </button>
        )}

      {props.isEditing &&
        addStorySelected && (
          <div className="story-form">
            <div className="story-form__heading">
              <h4>Enter Story Name:</h4>
              <Icon
                type="X"
                size="small"
                className="story-form__exit"
                onClick={addStoryExit}
              />
            </div>

            <div className="story-form__input">
              <FormControl
                type="text"
                value={storyName}
                placeholder="Enter text"
                onChange={storyNameChange}
              />
            </div>

            <GetEditStorySearchResults handleSelect={onSelectPoi} />

            <button
              className="button button--light button--full-width"
              onClick={submitStoryName}
            >
              Submit
            </button>
          </div>
        )}

      {props.isStorySelected && (
        <button
          className="button button--light button--full-width sidebar__exit-story"
          onClick={exitStory}
        >
          Exit Story
        </button>
      )}

      <div className="footer" />
    </div>
  )
}

export default StoryList
