import { Alert, Form } from 'react-bootstrap'
import { Api } from './utils'
import { NavBar, FieldGroup } from './components'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from 'redux/reducer'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    let { username, password } = this.state
    let { isLoginPending, isLoginSuccess, loginError } = this.props
    return (
      <div>
        <NavBar showEdit={false} />
        <Form horizontal className="container" onSubmit={this.onSubmit}>
          <div className="form-group-collection">
            <FieldGroup
              controlID="username"
              label="username"
              inputType="text"
              placeholder="Enter your username here"
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
            />

            <FieldGroup
              controlID="password"
              label="password"
              inputType="text"
              placeholder="Enter your password here"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <div>
              {this.state.error && (
                <Alert bsStyle="danger">{this.state.error}</Alert>
              )}
            </div>
          </div>

          <FieldGroup
            inputType="button"
            buttonText="Login"
            type="submit"
            onClick={this.onSubmit}
          />

          <div className="message">
            {isLoginPending && <div>Please wait...</div>}
            {isLoginSuccess && <div>Success.</div>}
            {loginError && <div>{loginError.message}</div>}
          </div>
        </Form>
      </div>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    let { username, password } = this.state
    const data = {
      username,
      password
    }
    Api.postLogin(data)
      .then(({ message: error, status }) => {
        if (status === 'failed') {
          this.setState({ error })
        } else {
          console.log('HI')
          this.props.login(username, password)
          // this.setState({ logged_in: true })
          // this.props.history.push('/', { isEditing: true })
        }
      })
      .catch(err => {
        //TODO: Handle any error from request
        console.error(err)
        this.setState({ error: 'An unknown error occured' })
      })

    this.setState({
      username: '',
      password: ''
    })
  }
}

const mapStateToProps = state => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
