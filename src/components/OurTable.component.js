import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Icon, FieldGroup } from '../components'

class OurTable extends Component {
  state = {
    data: this.props.isUpdatingPOI
      ? this.props.data
      : [new Array(this.props.colNames.length).fill('')]
  }

  constructor(props) {
    super(props)
    this.onAddRow = this.onAddRow.bind(this)
    this.onChangeLink = this.onChangeLink.bind(this)
    this.onDeleteRow = this.onDeleteRow.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
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
    const { colNames, shouldShowFormValidation } = this.props
    const { data } = this.state
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            {
              //creates table header for each column name
            }
            <tr>
              {colNames
                .concat(['Remove'])
                .map(name => <th key={name}>{name}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              //for every row in rowCount
            }
            {data.map((_, row_index) => (
              <tr key={row_index}>
                {
                  //create an editable textfield cell for each column name except for the last one
                }
                {colNames.slice(0, colNames.length).map((_, col_index) => (
                  <th key={col_index}>
                    <FieldGroup
                      inputType="text"
                      value={data[row_index][col_index]}
                      onChange={e => this.onChangeLink(row_index, col_index, e)}
                      validationState={
                        shouldShowFormValidation &&
                        (col_index === 0 &&
                          (!data[row_index][col_index] ||
                            !data[row_index][col_index].startsWith('http://')))
                          ? 'error'
                          : null
                      }
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
