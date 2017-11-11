import React, { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import Sidebar from 'react-sidebar'

class StoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
      // docked: true
    }
    this.onSetOpen = this.onSetOpen.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // invoked every time component is recieves new props.
    // does not before initial 'render'
    this.setState({ open: nextProps.showSidebar })
  }

  onSetOpen(open) {
    this.setState({ showSidebar: open })
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
        backgroundColor: '#757575'
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
        {/*<div style={styles.content}/>*/}
        <a href="" style={styles.sidebarLink}>
          Story 1
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 2
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 1
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 2
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 1
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 2
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 1
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 2
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 1
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 2
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
        <a href="" style={styles.sidebarLink}>
          Story 3
        </a>
      </div>
    )

    const sidebarProps = {
      sidebar: sidebarContent,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
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
