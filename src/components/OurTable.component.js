import React, { Component } from 'react'
import { Table, FormGroup, FormControl } from 'react-bootstrap'
import { FieldGroup } from '../components'

class OurTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let colNames = ['Link URL', 'Display Name', 'Remove']

    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>{colNames.map(name => <th>{name}</th>)}</tr>
          </thead>
          <tbody>
            <tr>
              {colNames.slice(0, colNames.length - 1).map(_ => (
                <th>
                  <FieldGroup
                    inputType="text"
                    placeHolder="enter your value here"
                  />
                </th>
              ))}
              <th>X</th>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default OurTable
