import React from 'react'
import { View, Text } from 'react-native'

import { CachePureComponent } from '../../../helpers/components'
import { toBigNum } from '../../../../utils/number'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import FormWrapper from '../../../components/FormWrapper'
import CopyToClipboardButton from '../../../components/CopyToClipboardButton'
import TextInput from '../../../components/TextInput'


const TEN_BN = toBigNum(10)

const UNIT_POWERS = {
  ether: TEN_BN.pow(18),
  finney: TEN_BN.pow(15),
  szabo: TEN_BN.pow(12),
  gwei: TEN_BN.pow(9),
  mwei: TEN_BN.pow(6),
  kwei: TEN_BN.pow(3),
  wei: TEN_BN.pow(0)
}

const UNITS = Object.keys(UNIT_POWERS)

export default class UnitConverter extends CachePureComponent {
  static navigationOptions = {
    drawerLabel: t('title.convertUnits'),
    title: t('title.convertUnits')
  }

  state = UNITS.reduce((m, n) => {
    m[n] = '' // eslint-disable-line no-param-reassign
    return m
  }, {})

  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <FormWrapper style={styles.formWrapper}>
          {UNITS.map(unit => (
            <View
              key={unit}
              style={styles.field}
            >
              <Text style={styles.labelText}>{unit}</Text>
              <TextInput
                value={this.state[unit]}
                style={styles.textInput}
                onChange={this.bind(this._onChange, unit)}
              />
              <CopyToClipboardButton text={this.state[unit]} />
            </View>
          ))}
        </FormWrapper>
      </Layout>
    )
  }

  _onChange = (unit, newValue) => {
    let numBN

    try {
      numBN = toBigNum(newValue)
    } catch (_) {
      // do nothing!
    }

    // if valid number then calculate
    if (numBN && numBN.isFinite()) {
      // wei = num * 10^(unit power)
      const weiBN = numBN.times(UNIT_POWERS[unit])

      const newState = UNITS.reduce((m, u) => {
        if (unit !== u) {
          // eslint-disable-next-line no-param-reassign
          m[u] = weiBN.div(UNIT_POWERS[u]).toFixed()
        }
        return m
      }, {
        [unit]: newValue
      })

      this.setState(newState)
    }
    // invalid
    else {
      // clear all other values
      this.setState(UNITS.reduce((m, u) => {
        if (unit !== u) {
          m[u] = '' // eslint-disable-line no-param-reassign
        }
        return m
      }, {
        [unit]: newValue
      }))
    }
  }
}
