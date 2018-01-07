import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Icon } from './'

class NavBar extends PureComponent {
  render() {
    const {
      isStorySelected,
      selectedStoryName,
      startYear,
      endYear
    } = this.props
    const contextText = isStorySelected
      ? selectedStoryName
      : `${startYear} - ${endYear}`
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
          <div className="navbar-content__item navbar-content__context ">
            Now Viewing: {contextText}
          </div>
          {this.props.showEdit && (
            <div className="navbar-content__item" onClick={this.props.onEdit}>
              {this.props.isEditing ? 'Disable Editing' : 'Enable Editing'}
            </div>
          )}
          <Link to="/login">
            <div className="navbar-content__item">Login</div>
          </Link>
        </div>
      </Navbar>
    )
  }
}

export default NavBar
