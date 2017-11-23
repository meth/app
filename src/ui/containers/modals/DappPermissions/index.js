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

    this.state = { permissions }
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
    const { permissions } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <View style={styles.dappTitle}>
          <Text style={styles.dappTitlePrefixText}>DAPP:</Text>
          <Text style={styles.dappTitleIdText}>{dappId}</Text>
        </View>
        {this.renderForm(addresses, permissions)}
      </Modal>
    )
  }

  renderForm (addresses, permissions) {
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
              turnedOn={_.get(permissions, ALL_ADDRESSES, false)}
              label={t(`dappPermissions.${ALL_ADDRESSES}`)} />
          </Form.Field>
        </Form.Section>
        <Form.Section
          title={t('dappPermissions.apiPermissions')}
          style={styles.section}
          layoutStyle={styles.sectionLayout}
          titleTextStyle={styles.sectionTitleText}
        >
          <Form.Field name={`api.${GENERATE_ADDRESS}`} style={styles.field}>
            <Switch
              turnedOn={_.get(permissions, `api.${GENERATE_ADDRESS}`, false)}
              label={t(`dappPermissions.api.${GENERATE_ADDRESS}`)} />
          </Form.Field>
        </Form.Section>
      </Form>
    )
  }

  onChange = values => {
    const { permissions } = this.state

    this.setState({
      permissions: {
        ...permissions,
        ...values
      }
    })
  }

  onSubmit = values => {
    console.log('submit', values)
  }

  validate = values => {
    const ret = {}

    const { [ALL_ADDRESSES]: allAddresses } = values

    if (!allAddresses) {
      ret[ALL_ADDRESSES] = Form.VALIDATION_RESULT.MISSING
    }

    return ret
  }

  close = () => {
    const { actions: { hideDappPermissionsModal } } = this.props

    hideDappPermissionsModal()
  }
}
