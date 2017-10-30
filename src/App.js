import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">NNB</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>Hola</h1>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
