import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Feather from 'react-feather'
import classnames from 'classnames'
import './../styles/icon.css'

const FEATHER_ICON_SIZE_SMALL = 15
const FEATHER_ICON_SIZE_LARGE = 24

const stub = () => {}

export default class Icon extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'large']).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  render() {
    const { type, size, className, onClick, disabled } = this.props
    const FeatherIcon = Feather[type]

    return (
      <div
        className={classnames('feather-icon', `feather-icon--${size}`, {
          [className]: !!className,
          'feather-icon--disabled': disabled
        })}
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
