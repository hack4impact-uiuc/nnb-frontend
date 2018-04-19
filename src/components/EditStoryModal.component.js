import React, { Component } from 'react'
import Modal from 'react-modal'
import { GetEditStorySearchResults } from './'
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

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ showModal: true })
    this.props.toggleSidebar()
  }

  handleCloseModal() {
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
          <div>
            Edit Story
            <div className="story-form__input">
              <FormControl
                type="text"
                value={storyName}
                placeholder="Enter text"
                onChange={storyNameChange}
              />
            </div>
            <GetEditStorySearchResults handleSelect={onSelectPoi} />
            <button
              className="button button--dark button--full-width"
              onClick={updateStoryName}
            >
              Submit
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default EditStoryModal
