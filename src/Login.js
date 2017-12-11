import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Alert,
  Form
} from 'react-bootstrap'
import { withRouter } from 'react-router'

import NavBar from './components/NavBar'
import { Api } from './utils'
import { FieldGroup } from './components'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      username: '',
      password: ''
    }
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeUsername(inputUsername) {
    this.setState({
      username: inputUsername.target.value
    })
  }

  onChangePassword(inputPassword) {
    this.setState({
      password: inputPassword.target.value
    })
  }

  onSubmit() {
    const { username, password } = this.state
    const data = {
      username: username,
      password: password
    }
    Api.postLogin(data)
      .then(({ message: error, status }) => {
        if (status === 'failed') {
          this.setState({ error })
        } else {
          this.props.history.push('/', { isEditing: true })
        }
      })
      .catch(err => {
        //TODO: Handle any error from request
        console.error(err)
        this.setState({ error: 'An unknown error occured' })
      })
  }

  render() {
    return (
      <div>
        <NavBar isEditing={false} />
        {/* <Form horizontal> */}
        <Form horizontal className="container">
          <FieldGroup
            controlID="username"
            label="username"
            inputType="text"
            placeholder="Enter your username here"
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
          <FieldGroup
            controlID="password"
            label="password"
            inputType="text"
            placeholder="Enter your password here"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
          {this.state.error && (
            <Alert bsStyle="danger">{this.state.error}</Alert>
          )}
          <FieldGroup
            inputType="button"
            label=""
            buttonText="Submit"
            onClick={this.onSubmit}
          />
        </Form>
      </div>
    )
  }
}

export default withRouter(Login)
