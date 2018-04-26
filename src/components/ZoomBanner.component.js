import React, { Component } from 'react'
import './../styles/zoomwindow.css'
import { debounce } from 'lodash'
import classnames from 'classnames'
class ZoomBanner extends Component {
  state = {
    isShowing: true
  }

  updateScale = scale => {
    this.setState({
      scale,
      isShowing: true
    })
    setTimeout(() => {
      this.setState({
        isShowing: false
      })
    }, 1000)
  }

  componentWillReceiveProps(nextProps) {
    this.updateScale(nextProps.scale)
  }

  componentDidMount() {
    this.updateScale = debounce(this.updateScale, 15)
    setTimeout(() => {
      this.setState({
        isShowing: false
      })
    }, 1000)
  }

  render() {
    const { scale, isShowing } = this.state

    return (
      <div>
        <div
          className={classnames(
            'zoomwindow',
            `zoomwindow${isShowing ? '--show' : '--hide'}`
          )}
        >
          {scale}%
        </div>
      </div>
    )
  }
}
export default ZoomBanner
