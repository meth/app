import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { t } from '../../../../common/strings'
import {
  instanceOfError,
  UnableToConnectError,
  RequestTimeoutError
} from '../../../utils/errors'
import AlertBox from '../AlertBox'
import ExpandingView from '../ExpandingView'
import styles from './styles'


const renderError = error => {
  if (!error) {
    return null
  }

  let couldBeMethodCallError = false
  let renderedError

  if (instanceOfError(error, UnableToConnectError)) {
    renderedError = t('error.unableToConnect')
  } else if (instanceOfError(error, RequestTimeoutError)) {
    renderedError = t('error.requestTimeout')
  } else {
    couldBeMethodCallError = true
    renderedError = String(error)
  }

  const key = `${error}`

  if (couldBeMethodCallError && _.get(error, 'method')) {
    const { method, details } = error

    renderedError = (
      <View key={key}>
        <Text style={styles.errorText}>
          {t('error.methodCall', { method })}
        </Text>
        {(!details) ? null : (
          <Text style={styles.errorText}>
            {JSON.stringify(details, null, 2)}
          </Text>
        )}
      </View>
    )
  } else {
    renderedError = (
      <Text key={key} style={styles.errorText}>{renderedError}</Text>
    )
  }

  return renderedError
}

const ErrorBox = ({ animate, error, style }) => {
  const errors = [].concat(error).map(renderError)

  const validErrors = errors.filter(e => !!e)

  if (!validErrors.length) {
    return null
  }

  const box = <AlertBox type="error" style={style}>{validErrors}</AlertBox>

  return (!animate) ? box : (
    <ExpandingView duration={1000} finalMaxHeight={300}>{box}</ExpandingView>
  )
}

ErrorBox.propTypes = {
  animate: PropTypes.bool,
  error: PropTypes.any,
  style: PropTypes.any
}

ErrorBox.defaultProps = {
  animate: true
}

export default ErrorBox
