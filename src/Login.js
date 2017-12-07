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
  Alert
} from 'react-bootstrap'
import { withRouter } from 'react-router'

import NavBar from './components/NavBar'
import { postLogin } from './utils/apiWrapper'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

class Login extends Component {
  state = {
    error: null
  }

  onSubmitForm = e => {
    e.preventDefault()
    const { username, password } = e.target
    const data = {
      username: username.value,
      password: password.value
    }

    // TODO: replace URL with correct url
    postLogin(data)
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
        this.setState({ error: 'An unkonwn error occured' })
      })
  }

  render() {
    return (
      <div>
        <NavBar isEditing={false} />
        <Grid>
          <Row>
            <Col md={4} xs={18} mdOffset={4}>
              <form onSubmit={this.onSubmitForm}>
                {' '}
                {/* TODO: replace with URL for form */}
                <FieldGroup
                  id="username"
                  type="text"
                  label="Username"
                  placeholder="Username"
                />
                <FieldGroup id="password" label="Password" type="password" />
                {this.state.error === null ? null : (
                  <Alert bsStyle="danger">{this.state.error}</Alert>
                )}
                <Button type="submit">Submit</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Login)
