import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { t } from '../../../../../common/strings'
import Header from '../../liveComponents/Header'
import ScrollView from '../../../components/ScrollView'
import BlockOfText from '../../../components/BlockOfText'
import styles from './styles'
import logger from '../../../../logger'

export default class Layout extends PureComponent {
  static propTypes = {
    useKeyboardAvoidingScrollView: PropTypes.bool
  }

  static defaultProps = {
    useKeyboardAvoidingScrollView: true
  }

  state = {
    uiError: null
  }

  componentDidCatch (error, info) {
    logger.error('UI error', error, info)

    this.setState({ uiError: { error, info } })
  }

  render () {
    const { uiError } = this.state

    const { children, contentStyle, useKeyboardAvoidingScrollView } = this.props

    if (uiError) {
      return (
        <View style={styles.container}>
          <Text style={styles.uiErrorText}>{t('error.unexpectedPleaseRestart')}</Text>
          <BlockOfText text={uiError.error.stack} />
          <BlockOfText text={uiError.info.componentStack} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <ScrollView
          useKeyboardAvoidingScrollView={useKeyboardAvoidingScrollView}
          alwaysBounceVertical={false}
          style={styles.scrollView}
          contentContainerStyle={[ styles.content, contentStyle ]}
        >
          {children}
        </ScrollView>
      </View>
    )
  }
}
