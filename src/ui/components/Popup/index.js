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
  static childContextTypes = {
    addPopup: PropTypes.func,
    updatePopup: PropTypes.func,
    removePopup: PropTypes.func
  }

  state = {
    popups: []
  }

  getChildContext () {
    return {
      addPopup: this.addPopup,
      updatePopup: this.updatePopup,
      removePopup: this.removePopup
    }
  }

  addPopup = ({ style, content }) => {
    const id = `${Math.random()}`

    this.setState({
      popups: this.state.popups.concat({ id, style, content })
    })

    return id
  }

  updatePopup = (id, { content, style }) => {
    this.state.popups.forEach(p => {
      if (p.id === id) {
        p.content = content // eslint-disable-line no-param-reassign
        p.style = style // eslint-disable-line no-param-reassign
      }
    })

    this.setState({
      popups: [ ...this.state.popups ]
    })
  }

  removePopup = idToRemove => {
    this.setState({
      popups: this.state.popups.filter(({ id }) => id !== idToRemove)
    })
  }

  render () {
    const { children } = this.props

    const { popups } = this.state

    return (
      <View style={styles.popupContext}>
        {children}
        {popups.map(({ id, style, content }) => (
          <View key={id} style={[ styles.popup ].concat(style)}>{content}</View>
        ))}
      </View>
    )
  }
}
