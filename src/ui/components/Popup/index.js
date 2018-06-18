import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

export class Popup extends PureComponent {
  static contextTypes = {
    addPopup: PropTypes.func,
    updatePopup: PropTypes.func,
    removePopup: PropTypes.func
  }

  static propTypes = {
    style: PropTypes.any,
    children: PropTypes.element
  }

  render () {
    return null
  }

  componentDidMount () {
    const { addPopup } = this.context
    const { style, children: content } = this.props

    this.id = addPopup({ style, content })
  }

  componentDidUpdate () {
    const { updatePopup } = this.context
    const { style, children: content } = this.props

    updatePopup(this.id, { style, content })
  }

  componentWillUnmount () {
    const { removePopup } = this.context

    removePopup(this.id)
  }
}


export class PopupContext extends PureComponent {
  static propTypes = {
    style: PropTypes.any
  }

  static childContextTypes = {
    addPopup: PropTypes.func,
    updatePopup: PropTypes.func,
    removePopup: PropTypes.func
  }

  // we track popups outside the state because setState()
  // isn't synchronous
  popups = []

  getChildContext () {
    return {
      addPopup: this.addPopup,
      updatePopup: this.updatePopup,
      removePopup: this.removePopup
    }
  }

  addPopup = ({ style, content }) => {
    const id = `${Math.random()}`

    this.popups = this.popups.concat({ id, style, content })

    this.forceUpdate()

    return id
  }

  updatePopup = (id, { content, style }) => {
    this.popups.forEach(p => {
      if (p.id === id) {
        p.content = content // eslint-disable-line no-param-reassign
        p.style = style // eslint-disable-line no-param-reassign
      }
    })

    this.forceUpdate()
  }

  removePopup = idToRemove => {
    this.popups = this.popups.filter(({ id }) => id !== idToRemove)
    this.forceUpdate()
  }

  render () {
    const { children } = this.props

    return (
      <View style={styles.popupContext}>
        {children}
        {this.popups.map(({ id, style, content }) => (
          <View key={id} style={[ styles.popup ].concat(style)}>{content}</View>
        ))}
      </View>
    )
  }
}
