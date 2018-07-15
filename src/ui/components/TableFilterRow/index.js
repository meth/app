import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'
import FormWrapper from '../FormWrapper'

export default class TableFilterRow extends PureComponent {
  static propTypes = {
    renderFilter: PropTypes.func.isRequired,
    style: PropTypes.any
  }

  render () {
    const {
      renderFilter,
      style,
      children
    } = this.props

    return (
      <FormWrapper style={[ styles.container ].concat(style)}>
        {renderFilter()}
        <View style={styles.rightContent}>
          {children}
        </View>
      </FormWrapper>
    )
  }
}
