import React, { PureComponent } from 'react'
import {
  Navbar,
  ToggleButtonGroup,
  ToggleButton,
  Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from 'redux/reducer'

import { logout } from '../redux/reducer'

class NavBar extends PureComponent {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <div className="sidebar-menu" onClick={this.toggleSidebar} />
            {/* NNB */}
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

        {this.props.showEdit && (
          <Button onClick={this.props.logout}>Logout</Button>
        )}
      </Navbar>
    )
  }
}

// export default NavBar

const mapStateToProps = state => {
  return {
    // isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess
    // loginError: state.loginError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
