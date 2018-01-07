import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

// import {Header} from 'view/Shared/Header'
import { Routes } from '../view/Routes'
import {
  Navbar,
  ToggleButtonGroup,
  ToggleButton,
  Button
} from 'react-bootstrap'
// import {theme} from 'view/theme'

import { NavBar } from '../'

import Link from 'redux-first-router-link'

import { routeLogin, routeHome } from '../../actions'

// GLOBAL WRAPPER
const Wrapper = styled.div`
  text-align: center;
`

export const HomePage = () => (
  // <ThemeProvider theme={theme}>
  <Wrapper>
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <div className="sidebar-menu" onClick={this.toggleSidebar} />
          NNB
          {/* <Link to="/">NNB</Link> */}
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      {/* <ToggleButtonGroup
          type="checkbox"
          value={this.props.isEditing ? [1] : []}
          onChange={this.props.onEdit}
        > */}
      {/* {this.props.showEdit && <ToggleButton value={1}>Edit</ToggleButton>} */}
      {/* <Link to="/login">
            <Button>Login</Button>
          </Link> */}
      <Button>
        <Link to={routeHome()}>Home</Link>
      </Button>
      <Button>
        <Link to={routeLogin()}>Login</Link>
      </Button>

      {/* <Button>
            EditMode  
          </Button> */}

      {/* </ToggleButtonGroup> */}
    </Navbar>

    <Routes />
  </Wrapper>
  // </ThemeProvider>
)
