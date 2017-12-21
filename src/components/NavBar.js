import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Menu } from 'react-feather'

class NavBar extends PureComponent {
  render() {
    return (
      <Navbar>
        <div className="navbar-content">
          <div
            className="navbar-content__item navbar-content__icon"
            onClick={this.props.toggleSidebar}
          >
            {/* Make sure size is aligned with `navbar-content__icon` height! */}
            <Menu size={25} />
          </div>
          <div className="navbar-content__item navbar-content__title ">NNB</div>
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
