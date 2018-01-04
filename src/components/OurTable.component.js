import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Icon } from '../components'

class OurTable extends Component {
  constructor(props) {
    super(props)
    //colNames

    this.state = {
      data: [new Array(props.colNames.length).fill('')]
    }
    this.onAddRow = this.onAddRow.bind(this)
    this.onChangeLink = this.onChangeLink.bind(this)
    this.onDeleteRow = this.onDeleteRow.bind(this)
  }

  onAddRow() {
    this.setState(
      {
        data: this.state.data.concat([
          new Array(this.props.colNames.length).fill('')
        ])
      },
      () => this.props.setLinkData(this.state.data)
    )
  }

  onChangeLink(row, column, inputLink) {
    let temp = this.state.data.slice() //copies data
    temp[row].splice(column, 1, inputLink.target.value) //replace stuff at specified column with our target value
    this.setState(
      {
        data: temp
      },
      () => this.props.setLinkData(this.state.data)
    )
  }

  onDeleteRow(row) {
    let temp = this.state.data.slice()
    temp.splice(row, 1)
    this.setState(
      {
        data: temp
      },
      () => this.props.setLinkData(this.state.data)
    )
  }

  //languages.splice(1, 1, 'Python');  sfv

  render() {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            {
              //creates table header for each column name
            }
            <tr>
              {this.props.colNames
                .concat(['Remove'])
                .map(name => <th key={name}>{name}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              //for every row in rowCount
            }
            {this.state.data.map((_, row_index) => (
              <tr key={row_index}>
                {
                  //create an editable textfield cell for each column name except for the last one
                }
                {this.props.colNames
                  .slice(0, this.props.colNames.length)
                  .map((_, col_index) => (
                    <th key={col_index}>
                      <input
                        type="text"
                        value={this.state.data[row_index][col_index]}
                        onChange={e =>
                          this.onChangeLink(row_index, col_index, e)}
                      />
                    </th>
                  ))}
                <th>
                  <Icon
                    type="X"
                    size="small"
                    onClick={() => this.onDeleteRow(row_index)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>

        <button className="button button--dark" onClick={this.onAddRow}>
          + Add Link
        </button>
      </div>
    )
  }
}

export default OurTable
