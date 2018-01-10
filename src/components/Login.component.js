import React, { Component } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { Api } from './../utils'
import { FieldGroup } from './'
import './../styles/login.css'

export default class Login extends Component {
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
    this.setState({ error: '' })
    const { username, password } = this.state
    const data = {
      username,
      password
    }

    Api.postLogin(data)
      .then(({ message: error, status }) => {
        if (status === 'failed') {
          this.setState({ error })
        } else {
          this.props.setLogin(true)
          this.props.setShowLogin(false)
        }
      })
      .catch(err => {
        //TODO: Handle any error from request
        console.error(err)
        this.setState({ error: 'An unknown error occured' })
      })
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
            inputType="text"
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
