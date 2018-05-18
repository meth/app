import React from 'react'
import { SafeAreaView, View } from 'react-native'

import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import ScrollView from '../../../components/ScrollView'
import Button from '../../../components/Button'
import styles from './styles'


@connectStore('nav')
export default class MobileDrawer extends CachePureComponent {
  render () {
    const { descriptors } = this.props
    const { getCurrentRoute } = this.props.selectors

    const { routeName: currentRouteName } = getCurrentRoute()

    const pages = Object.keys(descriptors).map(desc => {
      const {
        options: { drawerLabel },
        state: { routeName }
      } = descriptors[desc]

      return (
        <Button
          key={desc}
          type='mobileDrawer'
          title={drawerLabel}
          onPress={this.bind(this._onPressRoute, routeName)}
          {...(routeName === currentRouteName ? {
            stateOverride: {
              buttonState: 'hover'
            }
          } : null)}
        />
      )
    })

    // console.warn(JSON.stringify(this.props, null, 2))
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.topItems}>
            {pages}
          </View>
          <View style={styles.bottomItems}>
            <Button
              type='mobileDrawer'
              title={'Network'}
              onPress={this._onPressNetwork}
            />
            <Button
              type='mobileDrawer'
              title={'Log'}
              onPress={this._onPressLog}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }

  _onPressRoute = routeName => {
    const { navGo } = this.props.actions

    navGo(routeName)
  }

  _onPressNetwork = () => {
    const { showConnectionModal } = this.props.actions

    showConnectionModal()
  }

  _onPressLog = () => {
    const { showLog } = this.props.actions

    showLog()
  }
}
