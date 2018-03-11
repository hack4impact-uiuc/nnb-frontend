import React, { Component } from 'react'

export default class Edit extends Component {
  render() {
    const { isEditing, enableEditMode, disableEditMode } = this.props
    return (
      <div>
        <button onClick={isEditing ? disableEditMode : enableEditMode}>
          {isEditing ? 'disableEditMode' : 'enableEditMode'}
        </button>
      </div>
    )
  }
}
