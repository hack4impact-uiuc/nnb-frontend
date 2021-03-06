import React, { Component } from 'react'
import Sidebar from 'react-sidebar'
import { Icon, StoryModal } from './'
import './../styles/storylist.css'
import './../styles/App.css'
import './../styles/button.css'
import classnames from 'classnames'

class StoryList extends Component {
  onSelectStory = storyId => {
    const { setSelectedStory, loadPOIs, toggleSidebar } = this.props
    setSelectedStory(storyId)
    loadPOIs()
    toggleSidebar()
  }

  onExitStory = () => {
    const { setSelectedStory, loadPOIs } = this.props
    setSelectedStory(null)
    loadPOIs()
  }

  onClickEdit = story => {
    const {
      setEditingStoryId,
      updateStoryNameInput,
      loadEditingPois
    } = this.props
    setEditingStoryId(story.id)
    updateStoryNameInput(story.name)
    this.handleOpenModal()
    loadEditingPois()
  }

  handleOpenModal = () => {
    const { showStoryModal, toggleSidebar, showStoryForm } = this.props
    showStoryForm()
    showStoryModal()
    toggleSidebar()
  }

  onClickDelete = story => {
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

  promptAndExitEditMode = storyId => {
    if (
      window.confirm(
        'Exit edit mode? Cannot be in edit mode while viewing a story.'
      )
    ) {
      const { disableEditMode, setSelectedStory, loadPOIs } = this.props
      disableEditMode()
      setSelectedStory(storyId)
      loadPOIs()
    }
  }

  render() {
    const sidebarContent = (
      <SidebarContent
        {...this.props}
        onSelectStory={this.onSelectStory}
        onExitStory={this.onExitStory}
        onClickDelete={this.onClickDelete}
        onClickEdit={this.onClickEdit}
        promptAndExitEditMode={this.promptAndExitEditMode}
        handleOpenModal={this.handleOpenModal}
      />
    )

    return (
      <div className="sidebar-container">
        <Sidebar
          sidebar={sidebarContent}
          open={this.props.shouldShowSidebar}
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
  onSelectStory,
  onExitStory,
  promptAndExitEditMode,
  onClickEdit,
  onClickDelete,
  stories,
  selectedStoryId,
  setSelectedStory,
  shouldShowStoryForm,
  editingStoryId,
  toggleSidebar,
  showStoryForm,
  isEditing,
  handleOpenModal
}) {
  const sortedStories = [...stories].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">Stories</h2>
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
                    : onSelectStory(story.id)}
              >
                {story.name}
              </div>
            )}
            {isEditing &&
              editingStoryId !== story.id && [
                <Icon
                  key="editStory"
                  type="Edit"
                  size="small"
                  className="story-item__icon"
                  onClick={() => onClickEdit(story)}
                />,
                <Icon
                  key="deleteStory"
                  type="Trash"
                  size="small"
                  className="story-item__icon"
                  onClick={() => onClickDelete(story)}
                />
              ]}
            {isEditing &&
              shouldShowStoryForm &&
              editingStoryId === story.id && <StoryModal />}
          </div>

          <div className="divider" />
        </div>
      ))}

      {isEditing &&
        !shouldShowStoryForm && (
          <button
            className="button button--light button--full-width"
            onClick={handleOpenModal}
          >
            Add Story
          </button>
        )}

      {isEditing && shouldShowStoryForm && !editingStoryId && <StoryModal />}

      {!!selectedStoryId && (
        <button
          className="button button--light button--full-width sidebar__exit-story"
          onClick={onExitStory}
        >
          Exit Story
        </button>
      )}

      <div className="footer" />
    </div>
  )
}

export default StoryList
