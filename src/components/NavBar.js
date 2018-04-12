import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap'
import { Icon, GetUniSearchResults } from './'

class NavBar extends PureComponent {
  promptAndExitStory = () => {
    if (
      window.confirm(
        'Exit story? Cannot be in edit mode while viewing a story.'
      )
    ) {
      this.props.exitStory()
      this.props.onEdit()
    }
  }

  render() {
    const {
      endYear,
      isEditing,
      isLoggedIn,
      isStorySelected,
      onEdit,
      selectedMap,
      selectedStoryName,
      setLogin,
      setShowLogin,
      showLogin,
      startYear,
      toggleSidebar,
      handleUniSearch,
      uniSearchInput
    } = this.props
    const contextYears = `${startYear} - ${endYear}`
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
          <GetUniSearchResults />
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
            <div
              className="navbar-content__item"
              onClick={isStorySelected ? this.promptAndExitStory : onEdit}
            >
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
