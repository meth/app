import React, { PureComponent } from 'react'
import { View } from 'react-native'

import styles from './styles'
import { addProtocol } from '../../../utils/url'
import IconButton from '../IconButton'
import TextInput from '../TextInput'
import WebView from '../WebView'

export default class BrowserTabView extends PureComponent {
  static propTypes = WebView.propTypes

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
            type='browserTab'
            icon={{ name: 'chevron-left' }}
            style={styles.navIconButton}
            onPress={this.back}
          />
          <IconButton
            type='browserTab'
            icon={{ name: 'chevron-right' }}
            style={styles.navIconButton}
            onPress={this.forward}
          />
          <IconButton
            type='browserTab'
            icon={{ name: 'refresh' }}
            style={styles.navIconButton}
            onPress={this.refresh}
          />
          <TextInput
            value={url}
            onChange={this.onChangeUrl}
            onSubmitEditing={this.onEnterUrl}
            style={styles.navUrlInput}
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

  back = () => {
    this.webView.goBack()
  }

  forward = () => {
    this.webView.goForward()
  }

  refresh = () => {
    this.webView.refresh()
  }

  openDevTools = () => {
    this.webView.openDevTools()
  }
}
