import React, { Component } from 'react'
import Modal from 'react-modal'
import { StoryForm } from './'
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

class StoryModal extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.shouldShowModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
        >
          <StoryForm />
        </Modal>
      </div>
    )
  }
}

export default StoryModal
