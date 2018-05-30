import React, { PureComponent } from 'react'

import { connectStore } from '../../../helpers/redux'
import TabView from '../../../components/TabView'
import AlertsTab from './Alerts'
import LogsTab from './Logs'
import Modal from '../../../components/Modal'
import { t } from '../../../../../common/strings'
import styles from './styles'

const TAB = {
  ALERTS: 'ALERTS',
  LOG: 'LOG'
}

const TAB_ROUTES = [
  { key: TAB.ALERTS, title: t('log.tab.alerts') },
  { key: TAB.LOG, title: t('log.tab.log') }
]


@connectStore('log')
export default class Log extends PureComponent {
  render () {
    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
        closeButtonStyle={styles.closeButton}
      >
        <TabView
          routes={TAB_ROUTES}
          initialIndex={0}
          getScene={this._getTabScene}
        />
      </Modal>
    )
  }

  _getTabScene = key => {
    switch (key) {
      case TAB.ALERTS:
        return <AlertsTab />
      case TAB.LOG:
        return <LogsTab />
      default:
        return null
    }
  }

  close = () => {
    const { actions: { seenAlerts, hideLog } } = this.props

    seenAlerts()
    hideLog()
  }
}
