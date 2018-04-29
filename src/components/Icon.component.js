import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Feather from 'react-feather'
import classnames from 'classnames'
import './../styles/icon.css'

const FEATHER_ICON_SIZE_SMALL = 15
const FEATHER_ICON_SIZE_LARGE = 24

const stub = () => {}

class Icon extends Component {
  state = {
    hover: false
  }
  static propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'large']).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }
  hoverTrue = () => {
    this.setState({ hover: true })
  }
  hoverFalse = () => {
    this.setState({ hover: false })
  }

  render() {
    const { type, size, className, onClick, disabled } = this.props
    const FeatherIcon = Feather[type]
    const hover = this.state.hover

    return (
      <div
        className={classnames('feather-icon', `feather-icon--${size}`, {
          [className]: !!className,
          'feather-icon--disabled': disabled
        })}
        onMouseOver={() => this.hoverTrue}
        onMouseOut={() => this.hoverFalse}
        onClick={disabled ? stub : onClick}
      >
        <FeatherIcon
          size={
            size === 'small' ? FEATHER_ICON_SIZE_SMALL : FEATHER_ICON_SIZE_LARGE
          }
        />
      </div>
    )
  }
}
export default Icon
