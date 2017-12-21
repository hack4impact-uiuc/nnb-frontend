import React, { PureComponent } from 'react'
import {
  Navbar,
  ToggleButtonGroup,
  ToggleButton,
  Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class NavBar extends PureComponent {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <div className="sidebar-menu" onClick={this.props.toggleSidebar}>
              =
            </div>
            <Link to="/">NNB</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <ToggleButtonGroup
          type="checkbox"
          value={this.props.isEditing ? [1] : []}
          onChange={this.props.onEdit}
        >
          {this.props.showEdit && <ToggleButton value={1}>Edit</ToggleButton>}
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </ToggleButtonGroup>
      </Navbar>
    )
  }
}

export default NavBar
