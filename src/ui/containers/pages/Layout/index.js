import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../common/strings'
import Header from '../../liveComponents/Header'
import ScrollView from '../../../components/ScrollView'
import BlockOfText from '../../../components/BlockOfText'
import styles from './styles'
import logger from '../../../../logger'

export default class Layout extends PureComponent {
  state = {
    uiError: null
  }

  componentDidCatch (error, info) {
    logger.error('UI error', error, info)

    this.setState({ uiError: { error, info } })
  }

  render () {
    const { uiError } = this.state

    const { children, contentStyle } = this.props

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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Header style={styles.header} />
        <View style={[ styles.content, contentStyle ]}>
          {children}
        </View>
      </ScrollView>
    )
  }
}
