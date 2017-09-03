import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../common/strings'
import { instanceOfError, UnableToConnectError, RequestTimeoutError } from '../../../utils/errors'
import AlertBox from '../AlertBox'
import styles from './styles'

export default class ErrorBox extends PureComponent {
  render () {
    const {
      error
    } = this.props

    let couldBeMethodCallError = false
    let renderedError

    if (instanceOfError(error, UnableToConnectError)) {
      renderedError = t('error.unableToConnect')
    } else if (instanceOfError(error, RequestTimeoutError)) {
      renderedError = t('error.requestTimeout')
    } else {
      couldBeMethodCallError = true
      renderedError = '' + error
    }

    if (couldBeMethodCallError && _.get(error, 'method')) {
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
      <AlertBox type="error">
        {renderedError}
      </AlertBox>
    )
  }
}
