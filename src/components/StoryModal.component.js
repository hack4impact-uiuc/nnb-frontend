import React, { Component } from 'react'
import Modal from 'react-modal'
import { StoryForm } from './'
import './../styles/storymodal.css'

class StoryModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.shouldShowModal} className="modal-content">
          <StoryForm />
        </Modal>
      </div>
    )
  }
}

export default StoryModal
