import React, { Component } from 'react'
import { Table, FormGroup, FormControl } from 'react-bootstrap'
import { FieldGroup } from '../components'

class OurTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstCol: [['', ''], ['', '']], //rename
      rowCount: [0, 1]
    }
    this.onAddRow = this.onAddRow.bind(this)
    this.onChangeLink = this.onChangeLink.bind(this)
  }

  onAddRow() {
    //add a flippin row
  }

  onChangeLink(row, column, inputLink) {
    let temp = this.state.firstCol.slice() //copies firstCol
    temp[row].splice(column, 1, inputLink.target.value)
    this.setState({
      firstCol: temp
    })
  }

  //languages.splice(1, 1, 'Python');

  render() {
    // let colNames = ['Link URL', 'Display Name', 'Remove']
    let colNames = [0, 1, 2]

    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>{colNames.map(name => <th>{name}</th>)}</tr>
          </thead>
          <tbody>
            {this.state.rowCount.map(row => (
              <tr>
                {colNames.slice(0, colNames.length - 1).map(column => (
                  <th>
                    <FieldGroup
                      inputType="text"
                      value={this.state.firstCol[row][column]}
                      onChange={e => this.onChangeLink(row, column, e)}
                    />
                  </th>
                ))}
                <th>X</th>
              </tr>
            ))}
          </tbody>
        </Table>
        <FieldGroup
          inputType="button"
          label=""
          buttonText="+"
          onClick={this.onAddRow}
        />
      </div>
    )
  }
}

export default OurTable
