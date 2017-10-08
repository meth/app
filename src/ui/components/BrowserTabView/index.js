import React, { PureComponent } from 'react'
import { View } from 'react-native'

import styles from './styles'
import { addProtocol } from '../../../utils/url'
import IconButton from '../IconButton'
import TextInput from '../TextInput'
import WebView from '../WebView'

export default class BrowserTabView extends PureComponent {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      url: props.url
    }
  }

  render () {
    const { url } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <IconButton
            icon={{ name: 'chevron-left' }}
            style={styles.navIconButton}
            onPress={this.onBack}
          />
          <IconButton
            icon={{ name: 'chevron-right' }}
            style={styles.navIconButton}
            onPress={this.onForward}
          />
          <IconButton
            icon={{ name: 'refresh' }}
            style={styles.navIconButton}
            onPress={this.onRefresh}
          />
          <TextInput
            value={url}
            onChange={this.onChangeUrl}
            onSubmitEditing={this.onEnterUrl}
            style={styles.navUrlInput}
          />
          <IconButton
            icon={{ name: 'plus' }}
            style={styles.navIconButton}
            onPress={this.onOpenDevTools}
          />
        </View>
        <View style={styles.webView}>
          <WebView
            {...this.props}
            onRedirect={this.props.onUrlChange}
            onNewTitle={this.props.onTitleChange}
            ref={v => {
              this.webView = v
            }}
          />
        </View>
      </View>
    )
  }

  componentWillReceiveProps (newProps) {
    const { url } = newProps

    if (url !== this.state.url) {
      this.setState({ url })
    }
  }

  onChangeUrl = e => {
    this.setState({
      url: e.target.value
    })
  }

  onEnterUrl = e => {
    this.webView.openUrl(addProtocol(e.target.value))
  }

  onBack = () => {
    this.webView.goBack()
  }

  onForward = () => {
    this.webView.goForward()
  }

  onRefresh = () => {
    this.webView.refresh()
  }

  onOpenDevTools = () => {
    this.webView.openDevTools()
  }
}
