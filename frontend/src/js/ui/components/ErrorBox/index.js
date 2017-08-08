import React, { Component } from 'react'

import styles from './styles'

export default class ErrorBox extends Component {
  render () {
    const {
      text
    } = this.props

    const ContainerDiv = styles.containerDiv()

    return (
      <ContainerDiv>
        {text}
      </ContainerDiv>
    )
  }
}
