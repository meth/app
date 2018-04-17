import React, { PureComponent } from 'react'

import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ModalFilterPicker from '../../../components/ModalFilterPicker'
import Layout from '../Layout'

@connectStore('nav')
export default class Test extends PureComponent {
  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <ModalFilterPicker
          title='Select address'
          style={styles.toPicker}
          options={this._getToAddressPickerOptions()}
          button={{
            theme: 'default',
            style: styles.toPickerButton
          }}
        />
      </Layout>
    )
  }

  _getToAddressPickerOptions () {
    const addresses = {
      '0x0d24f692c05036602076b3f51242b5A34C55Ee38': {
        label: 'test1'
      },
      '0xd87e26ebd0a1f9fbc3f10e6e9f4b1fdb1e460236': {

      },
      '0x119a800720133b3b4d5eeb37f8a389a85a215600': {

      }
    }

    return Object.keys(addresses).map(address => ({
      ...addresses[address],
      value: address,
      label: addresses[address].label || address
    }))
  }
}
