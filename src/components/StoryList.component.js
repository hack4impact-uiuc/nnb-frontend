import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import Sidebar from 'react-sidebar'
import { Icon, StoryForm } from './'
import { Api } from './../utils'
import './../styles/storylist.css'
import './../styles/App.css'
import './../styles/button.css'
import classnames from 'classnames'

class StoryList extends Component {
  state = {
    addStorySelected: false,
    storyName: '',
    updateStoryId: null
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
  }

  addStoryClicked() {
    this.setState({ addStorySelected: true })
    this.props.showStoryForm()
  }

  addStoryExit() {
    this.setState({ addStorySelected: false })
  }

  storyNameChange(e) {
    this.setState({ storyName: e.target.value })
  }

  onClickEdit(story) {
    this.setState({ updateStoryId: story.id, storyName: story.name })
    this.props.setEditingStoryId(story.id)
    this.props.updateStoryNameInput(story.name)
    this.props.showStoryForm()
  }

  onClickDelete(story) {
    if (
      window.confirm(
        'Delete the current story? This will permanently remove the story from the story list.'
      )
    ) {
      const { setSelectedStory, deleteStory } = this.props
      setSelectedStory(null)
      deleteStory(story.id)
    }
  }

  submitStoryName() {
    Api.createStory({ name: this.state.storyName })
      .then(() => this.props.loadStories())
      .then(() => {
        this.setState({
          addStorySelected: false,
          storyName: ''
        })
      })
  }

  updateStoryName() {
    const { updateStoryId, storyName } = this.state
    Api.updateStory(updateStoryId, { name: storyName })
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
    const { stories, shouldShowSidebar } = this.props

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
        storyName={this.state.storyName}
        storyNameChange={this.storyNameChange}
        submitStoryName={this.submitStoryName}
        stories={stories}
      />
    )

    return (
      <div>
        <Sidebar
          sidebar={sidebarContent}
          open={shouldShowSidebar}
          children=""
          sidebarClassName="sidebar"
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
  storyName,
  storyNameChange,
  submitStoryName,

  stories,
  selectedStoryId,
  setSelectedStory,
  toggleSidebar,
  shouldShowStoryForm,
  showStoryForm,
  isEditing,
  editingStoryId,
  ...props
}) {
  const sortedStories = [...stories].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">Story List</h2>
        <Icon
          type="X"
          size="large"
          onClick={toggleSidebar}
          className="sidebar__exit"
        />
      </div>

      <div className="divider" />

      {sortedStories.map(story => (
        <div key={story.id}>
          <div
            className={classnames('story-item', {
              'story-item--selected': story.id === selectedStoryId
            })}
          >
            {editingStoryId !== story.id && (
              <div
                className="story-item__name"
                onClick={() =>
                  isEditing
                    ? promptAndExitEditMode(story.id)
                    : setSelectedStory(story.id)}
              >
                {story.name}
              </div>
            )}
            {isEditing &&
              editingStoryId !== story.id && (
                <Icon
                  type="Edit"
                  size="small"
                  className="story-item__icon"
                  onClick={() => onClickEdit(story)}
                />
              )}
            {isEditing &&
              editingStoryId !== story.id && (
                <Icon
                  type="Trash"
                  size="small"
                  className="story-item__icon"
                  onClick={() => onClickDelete(story)}
                />
              )}
            {isEditing &&
              shouldShowStoryForm &&
              editingStoryId === story.id && <StoryForm />}
          </div>

          <div className="divider" />
        </div>
      ))}

      {isEditing &&
        !shouldShowStoryForm && (
          <button
            className="button button--light button--full-width"
            onClick={showStoryForm}
          >
            Add Story
          </button>
        )}

      {isEditing && shouldShowStoryForm && !editingStoryId && <StoryForm />}

      {!!selectedStoryId && (
        <button
          className="button button--light button--full-width sidebar__exit-story"
          onClick={() => setSelectedStory(null)}
        >
          Exit Story
        </button>
      )}

      <div className="footer" />
    </div>
  )
}

export default StoryList
