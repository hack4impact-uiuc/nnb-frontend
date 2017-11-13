import React, { Component } from 'react'
import {
  Button,
  FormControl,
  Form,
  ControlLabel,
  FormGroup
} from 'react-bootstrap'
import Sidebar from 'react-sidebar'

class StoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addStorySelected: false,
      storyName: ''
    }
    //this.onSetOpen = this.onSetOpen.bind(this)
    this.addStoryClicked = this.addStoryClicked.bind(this)
    this.addStoryExit = this.addStoryExit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitStoryName = this.submitStoryName.bind(this)
  }

  /*  onSetOpen(open) {
    this.setState({ showSidebar: open })
  }
*/
  addStoryClicked() {
    this.setState({ addStorySelected: true })
  }

  addStoryExit() {
    this.setState({ addStorySelected: false })
  }

  handleChange(e) {
    this.setState({ storyName: e.target.value })
  }

  submitStoryName() {
    this.setState({
      addStorySelected: false,
      storyName: ''
    })
    //make api call here maybe?
  }

  render() {
    const styles = {
      sidebar: {
        width: 256,
        height: '100%'
      },
      sidebarLink: {
        display: 'block',
        padding: '16px 0px',
        color: '#FFF',
        textDecoration: 'none'
      },
      divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#FFF'
      },
      title: {
        display: 'inline',
        color: '#FFF'
      },
      exitbutton: {
        float: 'right',
        color: '#FFF',
        paddingRight: '0.5cm',
        paddingTop: '0.20cm'
      }
    }

    var sidebarContent = (
      <div style={styles.sidebar}>
        <div>
          <h2 style={styles.title}>Story List</h2>
          <a
            title="Exit"
            href="##"
            style={styles.exitbutton}
            onClick={this.props.toggleSidebar}
          >
            X
          </a>
        </div>
        <div style={styles.divider} />

        <a href="" style={styles.sidebarLink}>
          Story 1
        </a>
        <div style={styles.divider} />

        <a href="" style={styles.sidebarLink}>
          Story 2
        </a>
        <div style={styles.divider} />

        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <div style={styles.divider} />

        {this.props.isEditing &&
          !this.state.addStorySelected && (
            <Button onClick={this.addStoryClicked}>Add Story</Button>
          )}

        {this.props.isEditing &&
          this.state.addStorySelected && (
            <div>
              <h3 style={styles.title}>Enter Story Name:</h3>
              <a
                title="Exit2"
                href="#"
                style={styles.exitbutton}
                onClick={this.addStoryExit}
              >
                X
              </a>
              <form>
                <FormControl
                  type="text"
                  value={this.state.storyName}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
              </form>

              <Button onClick={this.submitStoryName}>Submit</Button>
            </div>
          )}
      </div>
    )

    const sidebarProps = {
      sidebar: sidebarContent,
      open: this.props.showSidebar,
      sidebarClassName: 'custom-sidebar-class'
    }

    return (
      <div>
        <Sidebar {...sidebarProps} />
      </div>
    )
  }
}

export default StoryList
