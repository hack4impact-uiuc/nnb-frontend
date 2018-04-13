import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap'
import { Icon } from './'

class NavBar extends PureComponent {
  promptAndExitStory = () => {
    if (
      window.confirm(
        'Exit story? Cannot be in edit mode while viewing a story.'
      )
    ) {
      const { setSelectedStory, enableEditMode } = this.props
      setSelectedStory(null)
      enableEditMode()

      // this.props.exitStory()
      this.props.onEdit()
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
      // endYear,
      isLoggedIn,
      isStorySelected,
      // onEdit,
      selectedMap,
      selectedStoryName,
      setLogin,
      setShowLogin,
      showLogin,
      // startYear,

      maps,
      selectedMapId,
      isEditing,

      toggleSidebar,
      enableEditMode,
      disableEditMode
    } = this.props

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

          {!showLogin &&
            !!selectedMap && (
              <div className="navbar-content__item-context navbar-content__context ">
                Now Viewing:
              </div>
            )}

          {isStorySelected &&
            !!selectedMap &&
            !showLogin && (
              <div className="navbar-content__item-context navbar-content__context-story-name ">
                {selectedStoryName}:
              </div>
            )}

          {!showLogin &&
            !!selectedMap && (
              <div className="navbar-content__item-context navbar-content__context-years ">
                {contextYears}
              </div>
            )}

          {isLoggedIn && (
            <div className="navbar-content__item" onClick={this.toggleEditMode}>
              {isEditing ? 'Disable Editing' : 'Enable Editing'}
            </div>
          )}
          {!isLoggedIn &&
            !showLogin && (
              <div
                className="navbar-content__item"
                onClick={() => setShowLogin(true)}
              >
                Login
              </div>
            )}
          {!isLoggedIn &&
            !!showLogin && (
              <div
                className="navbar-content__item"
                onClick={() => setShowLogin(false)}
              >
                Home
              </div>
            )}
          {!!isLoggedIn && (
            <div
              className="navbar-content__item"
              onClick={() => setLogin(false)}
            >
              Logout
            </div>
          )}
        </div>
      </Navbar>
    )
  }
}

export default NavBar
