import React, { Component } from 'react'
import Modal from 'react-modal'
import { GetEditStorySearchResults, StoryForm } from './'
import { FormControl } from 'react-bootstrap'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class EditStoryModal extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
    this.props.toggleSidebar()
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const {
      storyName,
      storyNameChange,
      onSelectPoi,
      updateStoryName
    } = this.props
    return (
      <div>
        <button onClick={this.handleOpenModal}>Edit</button>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
        >
          <StoryForm />
        </Modal>
      </div>
    )
  }
}

export default EditStoryModal
