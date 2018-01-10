import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap'
import { Icon } from './'

class NavBar extends PureComponent {
  render() {
    const {
      isStorySelected,
      selectedStoryName,
      startYear,
      endYear,
      isLoggedIn
    } = this.props
    const contextYears = `${startYear} - ${endYear}`
    return (
      <Navbar>
        <div className="navbar-content">
          <Icon
            type="Menu"
            size="large"
            onClick={this.props.toggleSidebar}
            className="navbar-content__item"
          />
          <div className="navbar-content__item navbar-content__title ">NNB</div>

          {!this.props.showLogin && (
            <div className="navbar-content__item-context navbar-content__context ">
              Now Viewing:
            </div>
          )}

          {isStorySelected &&
            !this.props.showLogin && (
              <div className="navbar-content__item-context navbar-content__context-story-name ">
                {selectedStoryName}:
              </div>
            )}

          {!this.props.showLogin && (
            <div className="navbar-content__item-context navbar-content__context-years ">
              {contextYears}
            </div>
          )}

          {this.props.isLoggedIn && (
            <div className="navbar-content__item" onClick={this.props.onEdit}>
              {this.props.isEditing ? 'Disable Editing' : 'Enable Editing'}
            </div>
          )}
          {!this.props.isLoggedIn &&
            !this.props.showLogin && (
              <div
                className="navbar-content__item"
                onClick={() => this.props.setShowLogin(true)}
              >
                Login
              </div>
            )}
          {!this.props.isLoggedIn &&
            !!this.props.showLogin && (
              <div
                className="navbar-content__item"
                onClick={() => this.props.setShowLogin(false)}
              >
                Home
              </div>
            )}
          {!!this.props.isLoggedIn && (
            <div
              className="navbar-content__item"
              onClick={() => this.props.setLogin(false)}
            >
              Logout
            </div>
          )}
        </div>
      </Navbar>
    )
  }
}

/*
<Link to="/login">
  <div className="navbar-content__item">Login</div>
</Link>
*/

export default NavBar
