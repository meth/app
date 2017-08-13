import React, { Component } from 'react'

import styles from './styles'

export default class Modal extends Component {
  render () {
    const OverlayView = styles.overlayView()

    return (
      <OverlayView>
        {this.props.children}
      </OverlayView>
    )
  }
}
