import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { isEqual } from 'lodash'
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

  componentDidMount() {
    this.props.setLinkData(this.state.data)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.state.data)) {
      this.setState({ data: nextProps.data })
    }
  }

  onAddRow() {
    const { data } = this.state
    if (
      (data && data.slice(-1) && data.slice(-1)[0] && data.slice(-1)[0][0]) ||
      (!!data && !data.length)
    ) {
      this.setState(
        {
          data: this.state.data.concat([
            new Array(this.props.colNames.length).fill('')
          ])
        },
        () => this.props.setLinkData(this.state.data)
      )
    } else {
      this.props.enableFormValidation(true)
    }
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
            {data.map((_, rowIndex) => (
              <tr key={rowIndex}>
                {
                  //create an editable textfield cell for each column name except for the last one
                }
                {colNames.slice(0, colNames.length).map((_, colIndex) => (
                  <th key={colIndex}>
                    <FieldGroup
                      inputType="text"
                      value={data[rowIndex][colIndex]}
                      onChange={e => this.onChangeLink(rowIndex, colIndex, e)}
                      validationState={
                        shouldShowFormValidation &&
                        (colIndex === 0 &&
                          (!data[rowIndex][colIndex] ||
                            !data[rowIndex][colIndex].startsWith('http://')))
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
                    onClick={() => this.onDeleteRow(rowIndex)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>

        <button
          className="button button--dark"
          onClick={this.onAddRow}
          type="button"
        >
          + Add Link
        </button>
      </div>
    )
  }
}

export default OurTable
