import React, { Component } from 'react'
import './../styles/zoomwindow.css'
import { debounce } from 'lodash'
import classnames from 'classnames'
class ZoomBanner extends Component {
  state = {
    isShowing: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      scale: nextProps.scale,
      isShowing: true
    })

    setTimeout(() => {
      this.setState({ isShowing: false })
    }, 1000)
  }

  constructor(props) {
    super(props)

    this.setState({
      scale: props.scale,
      isShowing: true
    })

    this.componentWillReceiveProps = debounce(
      this.componentWillReceiveProps,
      15
    )
  }

  componentDidMount() {
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
