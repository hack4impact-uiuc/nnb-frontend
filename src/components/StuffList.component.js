import React, { Component } from 'react'

export default class StuffList extends Component {
  componentWillMount() {
    this.props.fetchStuff()
  }

  render() {
    const { stuff } = this.props
    return stuff.length > 0 ? (
      stuff.map(thing => <div key={thing}>{thing}</div>)
    ) : (
      <div>No Data</div>
    )
  }
}
