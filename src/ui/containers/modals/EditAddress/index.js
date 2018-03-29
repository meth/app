import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Form from 'react-native-advanced-forms'

import { t } from '../../../../../common/strings'
import ADDRESS_TYPES from '../../../../../common/constants/addressTypes'
import { connectStore } from '../../../helpers/redux'
import { getAddressBook } from '../../../../redux/account/selectors'
import { getNodeConnection } from '../../../../redux/node/selectors'
import Modal from '../../../components/Modal'
import ErrorBox from '../../../components/ErrorBox'
import TextInput from '../../../components/TextInput'
import ProgressButton from '../../../components/ProgressButton'
import Button from '../../../components/Button'
import TitleText from '../../../components/TitleText'
import styles from './styles'

@connectStore('modals', 'account', 'node')
export default class EditAddress extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      address: PropTypes.string
    }).isRequired
  }

  constructor (props, ctx) {
    super(props, ctx)

    const { data: { address } } = this.props
    const addressBook = getAddressBook(this.props)

    this.state = {
      label: _.get(addressBook[address], 'label', ''),
      canSubmit: !(Object.keys(this.validate(addressBook[address])).length),
      submitting: false,
      error: null
    }
  }

  render () {
    const { data: { address } } = this.props

    const addressBook = getAddressBook(this.props)

    const type = _.get(addressBook[address], 'type')

    const network = _.get(getNodeConnection(this.props), 'network.description')

    const { label, submitting, canSubmit } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <TitleText text={t('title.editAddress')} />
        <Text>Address: ${address}</Text>
        <Text>Network: ${network}</Text>
        <Text>Type: ${type}</Text>
        <Form
          style={styles.form}
          ref={this._onFormRef}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          validate={this.validate}
        >
          <Form.Field name='label' style={styles.field}>
            <TextInput
              onChange={this._onLabelChange}
              value={label}
              style={styles.labelInput}
              placeholder={t('addressBook.editor.labelInputPlaceholder')}
            />
          </Form.Field>
        </Form>
        <View style={styles.buttons}>
          <ProgressButton
            disabled={!canSubmit}
            style={styles.button}
            showInProgress={submitting}
            onPress={this.submit}
            title={t('button.save')}
          />
          <Button
            style={styles.button}
            onPress={this.delete}
            title={t('button.delete')}
          />
        </View>
        {this.renderError()}
      </Modal>
    )
  }

  _onFormRef = f => {
    this.form = f
  }

  renderError () {
    const { error } = this.state

    return (!error) ? null : (
      <ErrorBox style={styles.errorBox} error={error} />
    )
  }

  onChange = values => {
    this.setState({ label: values.label })
  }

  onSubmit = data => {
    const { data: { address } } = this.props
    const { saveAddressBookEntry } = this.props.actions

    this.setState({
      submitting: false,
      error: null
    }, () => {
      saveAddressBookEntry(address, data)
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

    if (!_.get(values, 'label')) {
      ret.label = Form.VALIDATION_RESULT.MISSING
    }

    return ret
  }

  submit = () => {
    if (this.form) {
      this.form.validateAndSubmit()
    }
  }

  delete = () => {
    console.log('TODO: delete')
  }

  close = () => {
    const { hideEditAddressModal } = this.props.actions

    hideEditAddressModal()
  }
}
