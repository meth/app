import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { ERROR } from '../../../../common/constants'
import { t } from '../../../../common/strings'
import AlertBox from '../AlertBox'
import styles from './styles'

export default class ErrorBox extends PureComponent {
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
      <AlertBox type="error">
        {renderedError}
      </AlertBox>
    )
  }
}
