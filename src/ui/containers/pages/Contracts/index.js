import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import Form from 'react-native-advanced-forms'

import { getSupportedParamTypes, canRenderMethodParams, renderMethodParams } from './ethereum-abi-ui'
import { t } from '../../../../../common/strings'
import { isAddress, prefixedWith0x, prefixWith0x } from '../../../../utils/string'
import { getAbiFunctionNames } from '../../../../utils/contracts'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import formStyles from '../../../styles/forms'
import Layout from '../Layout'
import TitleText from '../../../components/TitleText'
import AlertBox from '../../../components/AlertBox'
import Loading from '../../../components/Loading'
import Picker from '../../../components/Picker'
import TextInput from '../../../components/TextInput'
import ErrorBox from '../../../components/ErrorBox'
import AddressTextInput from '../../liveComponents/AddressTextInput'


@connectStore('account')
export default class AddressBook extends PureComponent {
  state = {
    address: '',
    abi: '',
    selectedMethod: null,
    abiFunctions: null,
    error: null,
    submitting: false
  }

  render () {
    const { getAccounts } = this.props.selectors
    const accounts = getAccounts()
    const haveAccounts = !!(Object.keys(accounts).length)

    return (
      <Layout contentStyle={styles.layoutContent}>
        <TitleText text={t('title.contracts')} />
        {haveAccounts ? (
          this._renderContent()
        ) : (
          <Loading />
        )}
      </Layout>
    )
  }

  _renderContent () {
    const {
      error,
      address,
      abi
    } = this.state

    const { methodOptions, selectedMethodName } = this._getMethodPickerOptions()

    return (
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={formStyles.labelText}>{t('contracts.field.addressLabel')}</Text>
          <AddressTextInput
            value={address}
            onChange={this._onAddressChange}
            style={styles.textInput}
            placeholder={t('contracts.field.addressPlaceholder')}
          />
        </View>
        <View style={styles.field}>
          <Text style={formStyles.labelText}>{t('contracts.field.abiLabel')}</Text>
          <TextInput
            value={abi}
            style={styles.textInput}
            placeholder={t('contracts.field.abiPlaceholder')}
            multiline={true}
            numberOfLines={5}
            onChange={this._onAbiChange}
          />
        </View>
        {methodOptions ? (
          <View style={styles.actionBlockContainer}>
            <View style={styles.field}>
              <Text style={formStyles.labelText}>{t('contracts.field.methodLabel')}</Text>
              <Picker
                style={styles.picker}
                button={{ style: styles.pickerButton }}
                options={methodOptions}
                selected={selectedMethodName}
                onChange={this._onSelectMethod}
              />
            </View>
            {this._renderParams(abi, selectedMethodName)}
          </View>
        ) : null}
        <ErrorBox error={error} style={styles.errorBox} />
      </View>
    )
  }

  _renderParams (abi, method) {
    const can = canRenderMethodParams(abi, method)

    return (
      <View style={styles.methodParams}>
        {can ? (
          <Text>test</Text>
        ) : (
          <AlertBox
            animate={true}
            type='info'
            text={t('contracts.cannotCallMethodDueToParams', {
              types: getSupportedParamTypes().join(', ')
            })}
          />
        )}
      </View>
    )
  }

  _getMethodPickerOptions () {
    const { abi, address, selectedMethod } = this.state
    const functions = getAbiFunctionNames(abi)

    if (!address || !isAddress(address) || !functions) {
      return {}
    }

    const options = functions.map(f => {
      const selected = (selectedMethod === f)

      return {
        value: f,
        label: f,
        selected
      }
    })

    // select first option as default
    let selectedOption = options.find(({ selected }) => selected)
    if (!selectedOption) {
      [ selectedOption ] = options
      selectedOption.selected = true
    }

    return {
      methodOptions: options,
      selectedMethodName: selectedOption.value
    }
  }

  _onAbiChange = abi => {
    this.setState({ abi })
  }

  _onAddressChange = value => {
    let address = value

    // lowercase the address
    if (address) {
      address = address.toLowerCase()
      // prefix with 0x if needed
      if (!prefixedWith0x(address)) {
        address = prefixWith0x(address)
      }
    }

    this.setState({ address })
  }

  _onSelectMethod = selectedMethod => {
    this.setState({ selectedMethod })
  }
}
