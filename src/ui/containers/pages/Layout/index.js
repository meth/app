import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { t } from '../../../../../common/strings'
import Header from '../../liveComponents/Header'
import ScrollView from '../../../components/ScrollView'
import BlockOfText from '../../../components/BlockOfText'
import SplashBackgroundImage from '../../../components/SplashBackgroundImage'
import createStyles from './styles'
import logger from '../../../../logger'


export default class Layout extends PureComponent {
  static propTypes = {
    contentStyle: PropTypes.any,
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

    const {
      children,
      contentStyle,
      containerStyle,
      useKeyboardAvoidingScrollView
    } = this.props

    const styles = createStyles()

    let content

    if (uiError) {
      content = (
        <React.Fragment>
          <Text style={styles.uiErrorText}>{t('error.unexpectedPleaseRestart')}</Text>
          <BlockOfText text={uiError.error.stack} />
          <BlockOfText text={uiError.info.componentStack} />
        </React.Fragment>
      )
    }

    content = (
      <React.Fragment>
        <Header style={styles.header} />
        <ScrollView
          useKeyboardAvoidingScrollView={useKeyboardAvoidingScrollView}
          alwaysBounceVertical={false}
          style={styles.scrollView}
          contentContainerStyle={[ styles.content, contentStyle ]}
        >
          {children}
        </ScrollView>
      </React.Fragment>
    )

    return (
      <View style={[ styles.container, containerStyle ]}>
        <SplashBackgroundImage />
        {content}
      </View>
    )
  }
}
