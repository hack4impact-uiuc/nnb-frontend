import React, { Component } from 'react'
import { Table, FormGroup, FormControl } from 'react-bootstrap'

class OurTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <CleanTable
          inputType="columnHeaders"
          colHeaders={['i want', 'to die', 'remove']}
        />
        <CleanTable
          inputType="dataCellInput"
          colHeaders={['i want', 'to die', 'remove']}
        />
      </div>
    )
  }
}

function CleanTable({
  inputType, //eg. rowHeaders, columnHeaders, dataCellInput, etc
  colHeaders, //String[] of column headers
  rowHeaders,
  dataCellInput
}) {
  let tableModule

  switch (inputType) {
    case 'columnHeaders':
      tableModule = (
        <thead>
          <tr>{colHeaders.map(header => <th>{header}</th>)}</tr>
        </thead>
      )
      break
    case 'dataCellInput':
      tableModule = (
        <tbody>
          <tr>{colHeaders.map(header => <td>mtuhasiuvuck</td>)}</tr>
        </tbody>
      )
    default:
      tableModule = (
        <div>
          <h1>
            Please choose a valid inputType: rowHeaders, columnHeaders,
            dataCellInput
          </h1>
        </div>
      )
  }
  return (
    <div>
      <Table striped bordered condensed hover>
        {tableModule}
      </Table>
    </div>
  )
}

export default OurTable

// <thead>
//         <tr>
//           <th>{colHeaders[0]}</th>
//           <th>{colHeaders[1]}</th>
//           <th>{colHeaders[2]}</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>
//             <FormControl
//               type="text"
//             />
//           </td>
//           <td>
//             <FormControl
//               type="text"
//             />
//           </td>
//           <td>X</td>
//         </tr>
//       </tbody>
