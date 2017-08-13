import _ from 'lodash'
import React, { Component } from 'react'
import { View } from 'react-native'

import { ERROR } from '../../../../common/constants'
import { t } from '../../../../common/strings'
import styles from './styles'

export default class ErrorBox extends Component {
  render () {
    const {
      error
    } = this.props

    const ContainerView = styles.containerView()
    const ErrorText = styles.text()

    let renderedError = '' + error

    if (_.get(error, 'message') === ERROR.METHOD_CALL_ERROR) {
      const { method, details } = error

      renderedError = (
        <View>
          <ErrorText>{t('error.methodCall', { method })}</ErrorText>
          { details ? <ErrorText>{JSON.stringify(details, null, 2)}</ErrorText> : null}
        </View>
      )
    }

    return (
      <ContainerView>
        {renderedError}
      </ContainerView>
    )
  }
}
