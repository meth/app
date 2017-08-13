import React, { Component } from 'react'

import styles from './styles'

export default class Loading extends Component {
  render () {
    const LoadingText = styles.loadingText()

    return (
      <LoadingText>Loading...</LoadingText>
    )
  }
}
