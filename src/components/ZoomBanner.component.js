import React, { Component } from 'react'
import './../styles/zoomwindow.css'

class ZoomBanner extends Component {
  state = {
    scale: 1,
    isShowing: true
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      scale: nextProps.scale,
      isShowing: true
    })
    setTimeout(
      function() {
        this.setState({
          isShowing: false
        })
      }.bind(this),
      1000
    )
  }

  constructor(props) {
    super(props)
    this.setState({
      scale: props.scale,
      isShowing: true
    })
    setTimeout(
      function() {
        this.setState({
          isShowing: false
        })
      }.bind(this),
      1000
    )
  }

  render() {
    const { scale, isShowing } = this.state

    return (
      <div>
        {isShowing && (
          <div className="zoomwindow zoomwindow--show">{scale}%</div>
        )}
        {!isShowing && (
          <div className="zoomwindow zoomwindow--hide">{scale}%</div>
        )}
      </div>
    )
  }
}
export default ZoomBanner
