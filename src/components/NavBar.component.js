import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Icon } from './'

class NavBar extends PureComponent {
  promptAndExitStory = () => {
    if (
      window.confirm(
        'Exit story? Cannot be in edit mode while viewing a story.'
      )
    ) {
      const { setSelectedStory, enableEditMode, loadPOIs } = this.props
      setSelectedStory(null)
      enableEditMode()
      loadPOIs()
    }
  }

  toggleEditMode = () => {
    const {
      isEditing,
      enableEditMode,
      disableEditMode,
      selectedStoryId
    } = this.props

    if (isEditing) {
      disableEditMode()
    } else {
      if (selectedStoryId) {
        this.promptAndExitStory()
      } else {
        enableEditMode()
      }
    }
  }

  render() {
    const {
      pathname,
      maps,
      stories,
      selectedMapId,
      isEditing,
      isLoggedIn,
      selectedStoryId,
      toggleSidebar,
      enableEditMode,
      disableEditMode,
      logout
    } = this.props

    return (
      <Navbar>
        <div className="navbar-content">
          <Icon
            type="Menu"
            size="large"
            onClick={toggleSidebar}
            className="navbar-content__item"
          />
          <div className="navbar-content__item navbar-content__title ">NNB</div>

          <HeadingText
            {...{
              isLoggedIn,
              selectedMapId,
              maps,
              stories,
              selectedStoryId
            }}
          />

          {isLoggedIn && (
            <div
              className="navbar-content__item"
              onClick={isEditing ? disableEditMode : enableEditMode}
            >
              {isEditing ? 'Disable Editing' : 'Enable Editing'}
            </div>
          )}
          {/* TODO: only display if not on path '/' */}
          {pathname !== '/' && (
            <Link to="/" className="navbar-content__item">
              Home
            </Link>
          )}
          {isLoggedIn ? (
            <div className="navbar-content__item" onClick={logout}>
              Logout
            </div>
          ) : (
            <Link to="/login" className="navbar-content__item">
              Login
            </Link>
          )}
        </div>
      </Navbar>
    )
  }
}

function HeadingText({ maps, selectedMapId, stories, selectedStoryId }) {
  let contextYears = ''
  if (!!selectedMapId) {
    const startYearIndex = maps.findIndex(map => map.id === selectedMapId)
    const startYear = maps[startYearIndex].year
    const endYear =
      startYearIndex === maps.length - 1
        ? 'Present'
        : maps[startYearIndex + 1].year
    contextYears = `${startYear} - ${endYear}`
  }

  let selectedStoryName = ''
  if (!!selectedStoryId) {
    const selectedStory = stories.find(story => story.id === selectedStoryId)
    selectedStoryName = selectedStory.name
  }

  return [
    <div
      key={0}
      className="navbar-content__item-context navbar-content__context"
    >
      Now Viewing:
    </div>,
    !!selectedStoryId && (
      <div
        key={1}
        className="navbar-content__item-context navbar-content__context-story-name "
      >
        {selectedStoryName}:
      </div>
    ),
    <div
      key={2}
      className="navbar-content__item-context navbar-content__context-years"
    >
      {contextYears}
    </div>
  ]
}

export default NavBar
