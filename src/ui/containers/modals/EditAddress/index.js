import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Form from 'react-native-advanced-forms'

import { t } from '../../../../../common/strings'
import { toast } from '../../../../env'
import { isAddress } from '../../../../utils/string'
import ADDRESS_TYPES from '../../../../../common/constants/addressTypes'
import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import ErrorBox from '../../../components/ErrorBox'
import TextInput from '../../../components/TextInput'
import IconText from '../../../components/IconText'
import ProgressButton from '../../../components/ProgressButton'
import FormWrapper from '../../../components/FormWrapper'
import Button from '../../../components/Button'
import TitleText from '../../../components/TitleText'
import CopyableText from '../../../components/CopyableText'
import ChainExplorerIconButton from '../../liveComponents/ChainExplorerIconButton'
import AskUserConfirmModal from '../../../components/AskUserConfirmModal'
import styles from './styles'
import formStyles from '../../../styles/forms'

@connectStore('account')
export default class EditAddress extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      address: PropTypes.string,
      type: PropTypes.oneOf([
        ADDRESS_TYPES.ACCOUNT,
        ADDRESS_TYPES.OWN_ACCOUNT,
        ADDRESS_TYPES.CONTRACT
      ])
    })
  }

  constructor (props, ctx) {
    super(props, ctx)

    const { data: { address: addressOriginal, type } } = this.props

    const { getAddressBook } = this.props.selectors

    const addressBook = getAddressBook()

    this.state = {
      alreadyExists: !!_.get(addressBook[addressOriginal], 'label'),
      label: _.get(addressBook[addressOriginal], 'label', ''),
      type: _.get(addressBook[addressOriginal], 'type', type),
      submitting: false,
      error: null
    }
  }

  render () {
    const { data: { address: addressOriginal } } = this.props

    const { error, address, label, type, submitting, alreadyExists } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <TitleText
          style={styles.titleText}
          text={t(alreadyExists ? 'title.editAddressLabel' : 'title.addAddressLabel')}
        />
        {addressOriginal ? (
          <View style={styles.addressBlock}>
            <CopyableText
              style={styles.address}
              textStyle={styles.addressText}
              text={addressOriginal}
            />
            <ChainExplorerIconButton
              linkType='address'
              address={addressOriginal}
              style={styles.chainLinkButton}
            />
          </View>
        ) : null}
        {this._renderMeta({ type })}
        <FormWrapper style={styles.formWrapper}>
          <Form
            ref={this._onFormRef}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            validate={this.validate}
          >
            {addressOriginal ? null : (
              <Form.Field
                name='address'
                label={t('modal.editAddress.addressFieldLabel')}
                style={styles.field}
                labelStyle={formStyles.label}
                labelTextStyle={formStyles.labelText}
              >
                <TextInput
                  value={address}
                  style={styles.addressInput}
                  placeholder={t('modal.editAddress.addressInputPlaceholder')}
                />
              </Form.Field>
            )}
            <Form.Field
              name='label'
              label={t('modal.editAddress.labelFieldLabel')}
              style={styles.field}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <TextInput
                value={label}
                style={styles.labelInput}
                placeholder={t('modal.editAddress.labelInputPlaceholder')}
              />
            </Form.Field>
          </Form>
        </FormWrapper>
        <View style={styles.buttons}>
          <ProgressButton
            disabled={!(this.form && this.form.canSubmit())}
            style={styles.button}
            showInProgress={submitting}
            onPress={this.submit}
            title={t('button.save')}
          />
          {alreadyExists ? (
            <Button
              style={styles.button}
              onPress={this.delete}
              title={t('button.delete')}
            />
          ) : null}
        </View>
        <ErrorBox style={styles.errorBox} error={error} />
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

  _renderMeta ({ type }) {
    if (!type) {
      return null
    }

    let typeIcon = null
    switch (type) {
      case ADDRESS_TYPES.ADDRESS:
      case ADDRESS_TYPES.OWN_ACCOUNT: {
        typeIcon = 'user'
        break
      }
      case ADDRESS_TYPES.CONTRACT: {
        typeIcon = 'code'
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
      </View>
    )
  }

  onChange = ({ label, address }) => {
    this.setState({
      address,
      label,
      error: null
    })
  }

  onSubmit = () => {
    const { data: { address: addressOriginal } } = this.props
    const { saveAddressBookEntry } = this.props.actions
    const { address, label, type } = this.state

    this.setState({
      submitting: true,
      error: null
    }, () => {
      saveAddressBookEntry(address || addressOriginal, { label, type })
        .then(() => {
          toast(t('toast.addressSaved'))

          this.close()
        })
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  validate = values => {
    const { data: { address: addressOriginal } } = this.props
    const ret = {}

    if (!_.get(values, 'label')) {
      ret.label = Form.VALIDATION_RESULT.MISSING
    }

    // if adding a new address where user has to input the address
    if (!addressOriginal) {
      const addr = _.get(values, 'address')

      if (!addr) {
        ret.address = Form.VALIDATION_RESULT.MISSING
      } else if (!isAddress(addr)) {
        ret.address = Form.VALIDATION_RESULT.INCORRECT
      }
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
        .then(() => {
          toast(t('toast.addressDeleted'))

          this.close()
        })
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
