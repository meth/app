import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../common/strings'
import { connectRedux } from '../../helpers/decorators'
import styles from './styles'

@connectRedux()
export default class Layout extends Component {
  render () {
    const { children, contentStyle } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerAppNameText}>{t('appName')}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerBalanceText}>0.0001 ETH</Text>
            <Text style={styles.headerConnectionText}>Localhost (Mainnet)</Text>
          </View>
        </View>
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </View>
    )
  }
}
