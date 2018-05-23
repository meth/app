import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import { routes } from '../../../nav'
import styles from './styles'
import Layout from '../Layout'
import PinEntry from '../../../components/PinEntry'
import Button from '../../../components/Button'


@connectStore('config')
export default class SetupPin extends PureComponent {
  static navigationOptions = {
    title: t('title.enterPin')
  }

  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.intro1Text}>{t('setupPin.enterPin')}</Text>
        <PinEntry
          ref={this._onPinEntryRef}
          style={styles.pin}
          onPinEntered={this._onPinEntered}
        />
        <Button
          textStyle={styles.forgotPinButtonText}
          onPress={this._onPressForgotPin}
          title={t('setupPin.forgotMyPinCreateNewOne')}
        />
      </Layout>
    )
  }

  _onPressForgotPin = () => {
    const { navGo } = this.props.actions

    navGo(routes.SetupPin.routeName)
  }

  _onPinEntered = pin => {
    const { getSecurityPin } = this.props.selectors
    const { navPostPin } = this.props.actions

    if (getSecurityPin() === pin) {
      navPostPin()
    }
  }
}
