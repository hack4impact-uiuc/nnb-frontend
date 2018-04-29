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

    // TODO: address this warning.
    // need to hold on to timeout clearing funcs and call those when component is unmounting
    // Warning: Can only update a mounted or mounting component.
    // This usually means you called setState, replaceState, or forceUpdate on an unmounted component.
    // This is a no-op.
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
