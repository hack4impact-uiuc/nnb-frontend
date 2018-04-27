import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Icon, FieldGroup } from './'
import './../styles/App.css'
import './../styles/poi-form.css'
import './../styles/button.css'

export default class LinkTable extends Component {
  render() {
    const {
      links,
      addPOIFormLink,
      removePOIFormLink,
      modifyPOIFormLink
    } = this.props
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Link Url</th>
              <th>Display Name</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr key={`${index}`}>
                {Object.keys(link).map(key => (
                  <td key={`${key}${index}`}>
                    {/* TODO: the bug with the first input being unfocused is back =( */}
                    <FieldGroup
                      inputType="text"
                      value={link[key]}
                      onChange={e =>
                        modifyPOIFormLink(index, key, e.target.value)}
                    />
                  </td>
                ))}
                <td>
                  <Icon
                    type="X"
                    size="small"
                    onClick={() => removePOIFormLink(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button
          className="button button--dark"
          onClick={() => addPOIFormLink()}
          type="button"
        >
          + Add Link
        </button>
      </div>
    )
  }
}
