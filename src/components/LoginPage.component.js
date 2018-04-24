import React, { Component } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { FieldGroup } from './'
import './../styles/login.css'

export default class LoginPage extends Component {
  state = {
    error: null,
    username: '',
    password: ''
  }

  onChangeUsername = inputUsername => {
    this.setState({
      username: inputUsername.target.value
    })
  }

  onChangePassword = inputPassword => {
    this.setState({
      password: inputPassword.target.value
    })
  }

  onSubmit = () => {
    this.setState({ error: '' })
    const { username, password } = this.state

    // RIPerino
    // TODO: we know what we gotta do
    if (username === 'admin' && password === 'admin') {
      this.props.login()
      this.props.history.push('/')
    } else {
      this.setState({ error: 'incorrect credentials' })
    }
  }

  render() {
    const { username, password, error } = this.state

    return (
      <div className="container login-container">
        <Form className="login">
          <div className="header">
            <h1>Login</h1>
          </div>
          <FieldGroup
            controlID="username"
            label="username"
            inputType="text"
            placeholder="Enter your username here"
            className="login__field-group specifier"
            labelClassName="login__label"
            value={username}
            onChange={this.onChangeUsername}
          />
          <FieldGroup
            controlID="password"
            label="password"
            inputType="password"
            placeholder="Enter your password here"
            className="login__field-group specifier"
            labelClassName="login__label"
            value={password}
            onChange={this.onChangePassword}
          />
          {error && <Alert bsStyle="danger">{error}</Alert>}

          <div>
            <FieldGroup
              inputType="button"
              buttonText="Submit"
              onClick={this.onSubmit}
            />
          </div>
        </Form>
      </div>
    )
  }
}
