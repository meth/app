import _ from 'lodash'
import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { ERROR } from '../../../../common/constants'
import { t } from '../../../../common/strings'
import styles from './styles'

export default class ErrorBox extends Component {
  render () {
    const {
      error
    } = this.props

    let renderedError = '' + error

    if (_.get(error, 'message') === ERROR.METHOD_CALL_ERROR) {
      const { method, details } = error

      renderedError = (
        <View>
          <Text style={styles.errorText}>{t('error.methodCall', { method })}</Text>
          {(!details) ? null : (
            <Text style={styles.errorText}>{JSON.stringify(details, null, 2)}</Text>
          )}
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {renderedError}
      </View>
    )
  }
}
