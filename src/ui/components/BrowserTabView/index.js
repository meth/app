import React, { Component } from 'react'
import { View } from 'react-native'

import styles from './styles'
import IconButton from '../IconButton'
import TextInput from '../TextInput'


export default class TabView extends Component {
  render () {
    const { url } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <IconButton icon={{ name: 'chevron-left' }} style={styles.navIconButton} />
          <IconButton icon={{ name: 'chevron-right' }} style={styles.navIconButton} />
          <IconButton icon={{ name: 'refresh' }} style={styles.navIconButton} />
          <TextInput
            defaultValue={url}
            onSubmitEditing={this.onSubmitUrl}
            style={styles.navUrlInput}
          />
        </View>
      </View>
    )
  }

  onSubmitUrl = (e) => {
    const { onUrlChange } = this.props

    onUrlChange(e.target.value)
  }
}
