import React, { Component } from 'react'
import { View } from 'react-native'

import styles from './styles'
import { addProtocol } from '../../../utils/url'
import IconButton from '../IconButton'
import TextInput from '../TextInput'
import WebView from '../WebView'


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
            value={url}
            onSubmitEditing={this.onEnterUrl}
            style={styles.navUrlInput}
          />
        </View>
        <View style={styles.webView}>
          <WebView
            {...this.props}
            onRedirect={this.props.onUrlChange}
            onNewTitle={this.props.onTitleChange}
            ref={v => { this.webView = v }}
          />
        </View>
      </View>
    )
  }

  onEnterUrl = (e) => {
    this.webView.openUrl(addProtocol(e.target.value))
  }
}
