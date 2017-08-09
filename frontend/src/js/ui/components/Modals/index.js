import React, { Component } from 'react'

import styles from './styles'

export default class Modal extends Component {
  render () {
    const OverlayDiv = styles.overlayDiv()

    return (
      <OverlayDiv>
        {this.props.children}
      </OverlayDiv>
    )
  }
}
