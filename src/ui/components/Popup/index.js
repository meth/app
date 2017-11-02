import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

export class Popup extends PureComponent {
  static contextTypes = {
    setPopup: PropTypes.func
  }

  static propTypes = {
    style: PropTypes.any,
    children: PropTypes.element
  }

  render () {
    return <View />
  }

  componentDidMount () {
    const { children, style } = this.props
    const { setPopup } = this.context

    setPopup(
      <View style={[ styles.popup, style ]}>{children}</View>
    )
  }

  componentWillUnmount () {
    const { setPopup } = this.context

    setPopup(null)
  }
}



export class PopupContext extends PureComponent {
  static childContextTypes = {
    setPopup: PropTypes.func
  }

  state = {
    popup: null
  }

  getChildContext () {
    return {
      setPopup: this.setPopup.bind(this)
    }
  }

  setPopup (popup) {
    this.setState({
      popup
    })
  }

  render () {
    const { style, children } = this.props

    const { popup } = this.state

    return (
      <View style={style}>
        {children}
        {popup}
      </View>
    )
  }
}
