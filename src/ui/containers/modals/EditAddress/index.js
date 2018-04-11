import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Form from 'react-native-advanced-forms'

import { t } from '../../../../../common/strings'
import ADDRESS_TYPES from '../../../../../common/constants/addressTypes'
import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import ErrorBox from '../../../components/ErrorBox'
import TextInput from '../../../components/TextInput'
import IconText from '../../../components/IconText'
import ProgressButton from '../../../components/ProgressButton'
import Button from '../../../components/Button'
import TitleText from '../../../components/TitleText'
import AskUserConfirmModal from '../../../components/AskUserConfirmModal'
import styles from './styles'
import formStyles from '../../../styles/forms'

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

    const { getAddressBook } = this.props.selectors

    const addressBook = getAddressBook()

    this.state = {
      label: _.get(addressBook[address], 'label', ''),
      submitting: false,
      error: null
    }
  }

  render () {
    const { data: { address } } = this.props

    const { getAddressBook, getNodeConnection } = this.props.selectors

    const addressBook = getAddressBook()

    const type = _.get(addressBook[address], 'type')

    const network = _.get(getNodeConnection(), 'network.description')

    const { label, submitting } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <TitleText style={styles.titleText} text={t('title.editAddressLabel')} />
        <Text style={styles.addressText}>{address}</Text>
        {this._renderMeta({ network, type })}
        <Form
          style={styles.form}
          ref={this._onFormRef}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          validate={this.validate}
        >
          <Form.Field
            name='label'
            label={t('modal.editAddress.labelFieldLabel')}
            style={styles.field}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              onChange={this._onLabelChange}
              value={label}
              style={styles.labelInput}
              placeholder={t('modal.editAddress.labelInputPlaceholder')}
            />
          </Form.Field>
        </Form>
        <View style={styles.buttons}>
          <ProgressButton
            disabled={!(this.form && this.form.canSubmit())}
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
        {this._renderError()}
        <AskUserConfirmModal
          ref={this._onConfirmModalRef}
          question={t('modal.editAddress.areYouSureYouWantToDelete')}
          yesButtonText={t('button.yes')}
          noButtonText={t('button.no')}
          onPressYes={this.onDelete}
        />
      </Modal>
    )
  }

  _onConfirmModalRef = d => {
    this.confirmDeleteModal = d
  }

  _onFormRef = f => {
    this.form = f
  }

  _renderMeta ({ network, type }) {
    if (!(network || type)) {
      return null
    }

    let typeIcon = null
    switch (type) {
      case ADDRESS_TYPES.OWN_ACCOUNT: {
        typeIcon = 'user'
        break
      }
      case ADDRESS_TYPES.CONTRACT: {
        typeIcon = 'file'
        break
      }
      default:
        break
    }

    return (
      <View style={styles.meta}>
        {typeIcon ? (
          <IconText
            style={styles.metaIcon}
            textStyle={styles.metaIconText}
            icon={{ name: typeIcon, style: styles.metaIconText }}
            text={t(`addressType.${type}`)}
          />
        ) : null}
        {network ? (
          <IconText
            style={styles.metaIcon}
            textStyle={styles.metaIconText}
            icon={{ name: 'plug', style: styles.metaIconText }}
            text={network}
          />
        ) : null}
      </View>
    )
  }

  _renderError () {
    const { error } = this.state

    return (!error) ? null : (
      <ErrorBox style={styles.errorBox} error={error} />
    )
  }

  onChange = values => {
    this.setState({
      label: values.label,
      error: null
    })
  }

  onSubmit = data => {
    const { data: { address } } = this.props
    const { saveAddressBookEntry } = this.props.actions

    this.setState({
      submitting: true,
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
    if (this.confirmDeleteModal) {
      this.confirmDeleteModal.show()
    }
  }

  onDelete = () => {
    const { data: { address } } = this.props
    const { deleteAddressBookEntry } = this.props.actions

    this.setState({
      submitting: false,
      error: null
    }, () => {
      deleteAddressBookEntry(address)
        .then(() => this.close())
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  close = () => {
    const { hideEditAddressModal } = this.props.actions

    hideEditAddressModal()
  }
}
