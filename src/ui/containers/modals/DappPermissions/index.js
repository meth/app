import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Form from 'react-native-advanced-forms'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import { ALL_ADDRESSES } from '../../../../../common/constants/dappPermissions'
import { GENERATE_ADDRESS } from '../../../../../common/constants/api'
import { getDappPermissions, getAddresses } from '../../../../redux/account/selectors'
import Modal from '../../../components/Modal'
import Switch from '../../../components/Switch'
import CheckBox from '../../../components/CheckBox'
import AlertBox from '../../../components/AlertBox'
import ErrorBox from '../../../components/ErrorBox'
import ProgressButton from '../../../components/ProgressButton'
import styles from './styles'


@connectStore('modals', 'account')
export default class DappPermissions extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      dappId: PropTypes.string.isRequired
    })
  }

  constructor (props, ctx) {
    super(props, ctx)

    const { data: { dappId } } = this.props
    const { [dappId]: permissions } = getDappPermissions(props)

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

    if (newDappId !== oldDappId) {
      const { [newDappId]: permissions } = getDappPermissions(newProps)

      this.setState({ permissions })
    }
  }

  render () {
    const { data: { dappId } } = this.props
    const addresses = getAddresses(this.props)
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
          text={t('dappPermissions.pleaseSet')} />

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

    return (
      <Form
        style={styles.form}
        ref={f => { this.form = f }}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        validate={this.validate}
      >
        <Form.Section
          title={t('dappPermissions.addressPermissions')}
          style={styles.section}
          layoutStyle={styles.sectionLayout}
          titleTextStyle={styles.sectionTitleText}
        >
          <Form.Field name={ALL_ADDRESSES} style={styles.field}>
            <Switch
              turnedOn={allAddressesEnabled}
              label={t(`dappPermissions.${ALL_ADDRESSES}`)} />
          </Form.Field>
          {Object.keys(addresses).map(address => (
            <Form.Field key={address} name={address} style={styles.field}>
              <CheckBox
                disabled={allAddressesEnabled}
                labelTextStyle={styles.addressCheckBoxLabelText}
                turnedOn={_.get(permissions, address, false)}
                label={address} />
            </Form.Field>
          ))}
        </Form.Section>
        <Form.Section
          title={t('dappPermissions.apiPermissions')}
          style={styles.section}
          layoutStyle={styles.sectionLayout}
          titleTextStyle={styles.sectionTitleText}
        >
          <Form.Field name={GENERATE_ADDRESS} style={styles.field}>
            <Switch
              turnedOn={_.get(permissions, GENERATE_ADDRESS, false)}
              label={t(`dappPermissions.api.${GENERATE_ADDRESS}`)} />
          </Form.Field>
        </Form.Section>
      </Form>
    )
  }

  onChange = values => {
    const oldPermissions = this.state.permissions || {}

    const addresses = getAddresses(this.props)

    const previouslyEnabledAddresses = Object.keys(oldPermissions).filter(
      key => oldPermissions[key] && !!addresses[key]
    )

    const newlyEnabledAddresses = Object.keys(values).filter(
      key => values[key] && !!addresses[key]
    )

    const allAddressesSwitchFlipped = values[ALL_ADDRESSES] && !oldPermissions[ALL_ADDRESSES]

    const newPermissions = { ...values }

    // if no addresses enabled then turn on "all addresses" setting
    if (!newlyEnabledAddresses.length) {
      newPermissions[ALL_ADDRESSES] = true
    }
    // if more addresses are enabled than there were previously then turn
    // off "all addresses" setting
    else if (newlyEnabledAddresses.length > previouslyEnabledAddresses) {
      newPermissions[ALL_ADDRESSES] = false
    }
    // if "all addresses" turned on then turn off individual addresses
    else if (allAddressesSwitchFlipped) {
      Object.keys(addresses).forEach(key => { newPermissions[key] = false })
    }

    const permissions = {
      ...oldPermissions,
      ...newPermissions
    }

    this.setState({ permissions, canSubmit: true })
  }

  onSubmit = values => {
    const { data: { dappId } } = this.props
    const { saveDappPermissions } = this.props.actions

    this.setState({
      submitting: false,
      error: null
    }, () => {
      saveDappPermissions(dappId, values)
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

    const addresses = getAddresses(this.props)

    const enabledAddresses = Object.keys(values).filter(
      key => values[key] && !!addresses[key]
    )

    if (!enabledAddresses.length && !values[ALL_ADDRESSES]) {
      ret[ALL_ADDRESSES] = Form.VALIDATION_RESULT.MISSINS
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
}
