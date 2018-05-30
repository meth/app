import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Form from 'react-native-advanced-forms'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import { ALL_ADDRESSES } from '../../../../../common/constants/dappPermissions'
import Modal from '../../../components/Modal'
import Switch from '../../../components/Switch'
import CheckBox from '../../../components/CheckBox'
import AlertBox from '../../../components/AlertBox'
import ErrorBox from '../../../components/ErrorBox'
import ProgressButton from '../../../components/ProgressButton'
import { extractAddressPermissions } from '../../../../utils/dapp'
import styles from './styles'

@connectStore('account')
export default class DappPermissions extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      dappId: PropTypes.string.isRequired
    })
  }

  constructor (props, ctx) {
    super(props, ctx)

    const { getDappPermissions } = this.props.selectors

    const { data: { dappId } } = this.props
    const { [dappId]: permissions } = getDappPermissions()

    this.state = {
      permissions,
      canSubmit: false,
      submitting: false,
      error: null
    }
  }

  componentWillReceiveProps (newProps) {
    const { data: { oldDappId } } = this.props
    const { data: { newDappId } } = newProps

    const { getDappPermissions } = newProps.selectors

    if (newDappId !== oldDappId) {
      const { [newDappId]: permissions } = getDappPermissions()

      this.setState({ permissions })
    }
  }

  render () {
    const { data: { dappId } } = this.props

    const { getAccounts } = this.props.selectors

    const addresses = getAccounts(this.props)

    const { permissions, submitting, canSubmit } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <View style={styles.dappTitle}>
          <Text style={styles.dappTitleIdText}>{dappId}</Text>
        </View>

        <AlertBox
          style={styles.alert}
          type="info"
          text={t('modal.dappPermissions.pleaseSet')} />

        {this.renderForm(addresses, permissions)}

        <ProgressButton
          disabled={!canSubmit}
          style={styles.button}
          showInProgress={submitting}
          onPress={this.submit}
          title={t('button.save')}
        />
        {this.renderError()}

      </Modal>
    )
  }

  renderError () {
    const { error } = this.state

    return (!error) ? null : (
      <ErrorBox style={styles.errorBox} error={error} />
    )
  }

  renderForm (addresses, permissions) {
    const allAddressesEnabled = _.get(permissions, ALL_ADDRESSES, false)

    const addressPermissions = extractAddressPermissions(permissions)

    // merge current addresses with ones already in permissions obj to get final list
    const addressList = Object.keys(addresses).reduce((m, a) => {
      if (undefined === m[a]) {
        // eslint-disable-next-line no-param-reassign
        m[a] = false
      }

      return m
    }, addressPermissions)

    return (
      <Form
        style={styles.form}
        ref={this._onFormRef}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        validate={this.validate}
      >
        <Form.Section
          title={t('modal.dappPermissions.addressPermissions')}
          style={styles.section}
          layoutStyle={styles.sectionLayout}
          titleTextStyle={styles.sectionTitleText}
        >
          <Form.Field name={ALL_ADDRESSES} style={styles.field}>
            <Switch
              turnedOn={allAddressesEnabled}
              label={t(`modal.dappPermissions.${ALL_ADDRESSES}`)} />
          </Form.Field>
          {Object.keys(addressList).map(address => (
            <Form.Field key={address} name={address} style={styles.field}>
              <CheckBox
                disabled={allAddressesEnabled}
                labelTextStyle={styles.addressCheckBoxLabelText}
                turnedOn={addressPermissions[address]}
                label={address} />
            </Form.Field>
          ))}
        </Form.Section>
      </Form>
    )
  }

  _onFormRef = f => {
    this.form = f
  }

  onChange = values => {
    const newPermissions = { ...values }

    const oldPermissions = this.state.permissions || {}
    const oldAddressPermissions = extractAddressPermissions(oldPermissions)

    // how many addresses were previously enabled?
    const previouslyEnabledAddressesCount = Object.keys(oldAddressPermissions).filter(a => (
      !!oldAddressPermissions[a]
    )).length

    // how many addresses are currently enabled?
    const newAddressPermissions = extractAddressPermissions(newPermissions)
    const newlyEnabledAddressesCount = Object.keys(newAddressPermissions).filter(a => (
      !!newPermissions[a]
    )).length

    // if no addresses enabled then turn on "all addresses" setting
    if (!newlyEnabledAddressesCount) {
      newPermissions[ALL_ADDRESSES] = true
    }
    // if more addresses are enabled than there were previously then turn
    // off "all addresses" setting
    else if (newlyEnabledAddressesCount > previouslyEnabledAddressesCount) {
      newPermissions[ALL_ADDRESSES] = false
    }
    // if "all addresses" turned on then turn off individual addresses
    else if (newPermissions[ALL_ADDRESSES] && !oldPermissions[ALL_ADDRESSES]) {
      Object.keys(newAddressPermissions).forEach(a => { newPermissions[a] = false })
    }

    this.setState({ permissions: newPermissions, canSubmit: true })
  }

  onSubmit = newPermissions => {
    const { data: { dappId } } = this.props
    const { saveDappPermissions } = this.props.actions

    this.setState({
      submitting: false,
      error: null
    }, () => {
      saveDappPermissions(dappId, newPermissions)
        .then(() => this.close())
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  validate = values => {
    const ret = {}

    const { getAccounts } = this.props.selectors

    const addresses = getAccounts()

    const enabledAddresses = Object.keys(values).filter(
      key => values[key] && !!addresses[key]
    )

    if (!enabledAddresses.length && !values[ALL_ADDRESSES]) {
      ret[ALL_ADDRESSES] = Form.VALIDATION_RESULT.MISSING
    }

    return ret
  }

  submit = () => {
    if (this.form) {
      this.form.validateAndSubmit()
    }
  }

  close = () => {
    const { hideDappPermissionsModal } = this.props.actions

    hideDappPermissionsModal()
  }

  _extractAddresses
}
