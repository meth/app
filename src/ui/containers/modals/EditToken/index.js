import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Form from 'react-native-advanced-forms'
import { isAddress } from 'web3-utils'

import { toFloat } from '../../../../utils/number'
import { t } from '../../../../../common/strings'
import { toast } from '../../../../env'
import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import ErrorBox from '../../../components/ErrorBox'
import TextInput from '../../../components/TextInput'
import AddressTextInput from '../../liveComponents/AddressTextInput'
import FormWrapper from '../../../components/FormWrapper'
import ProgressButton from '../../../components/ProgressButton'
import Button from '../../../components/Button'
import TitleText from '../../../components/TitleText'
import AskUserConfirmModal from '../../../components/AskUserConfirmModal'
import styles from './styles'
import formStyles from '../../../styles/forms'

@connectStore('account')
export default class EditToken extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      symbol: PropTypes.string
    }).isRequired
  }

  constructor (props, ctx) {
    super(props, ctx)

    const { data: { symbol } } = this.props

    const { getCustomTokens } = this.props.selectors

    const token = _.get(getCustomTokens(), symbol, {
      decimals: 18
    })

    this.state = {
      ...token,
      submitting: false,
      error: null
    }
  }

  render () {
    const { data: { symbol: updatingToken } } = this.props

    const { error, submitting, name, symbol, decimals, contractAddress } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <TitleText
          style={styles.titleText}
          text={t(`title.${updatingToken ? 'editToken' : 'addToken'}`)}
        />
        <FormWrapper style={styles.formWrapper}>
          <Form
            ref={this._onFormRef}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            validate={this.validate}
          >
            <Form.Field
              name='symbol'
              label={t('modal.editToken.symbolFieldLabel')}
              style={styles.field}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <TextInput
                disabled={!!updatingToken}
                value={symbol}
                style={styles.textInput}
                placeholder={t('modal.editToken.symbolInputPlaceholder')}
              />
            </Form.Field>
            <Form.Field
              name='name'
              label={t('modal.editToken.nameFieldLabel')}
              style={styles.field}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <TextInput
                value={name}
                style={styles.textInput}
                placeholder={t('modal.editToken.nameInputPlaceholder')}
              />
            </Form.Field>
            <Form.Field
              name='decimals'
              label={t('modal.editToken.decimalsFieldLabel')}
              style={styles.field}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <TextInput
                value={`${decimals}`}
                style={styles.textInput}
                placeholder={t('modal.editToken.decimalsInputPlaceholder')}
              />
            </Form.Field>
            <Form.Field
              name='contractAddress'
              label={t('modal.editToken.addressFieldLabel')}
              style={styles.field}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <AddressTextInput
                value={contractAddress}
                style={styles.textInput}
                placeholder={t('modal.editToken.addressInputPlaceholder')}
              />
            </Form.Field>
          </Form>
        </FormWrapper>
        <View style={styles.buttons}>
          <ProgressButton
            style={styles.button}
            showInProgress={submitting}
            onPress={this.submit}
            title={t('button.save')}
          />
          {updatingToken ? (
            <Button
              style={styles.button}
              onPress={this.delete}
              title={t('button.delete')}
            />
          ) : null}
        </View>
        <ErrorBox style={styles.errorBox} error={error} />
        <AskUserConfirmModal
          ref={this._onConfirmDeleteModalRef}
          question={t('modal.editToken.areYouSureYouWantToDelete')}
          yesButtonText={t('button.yes')}
          noButtonText={t('button.no')}
          onPressYes={this._onConfirmDelete}
        />
      </Modal>
    )
  }

  _onConfirmDeleteModalRef = d => {
    this.confirmDeleteModal = d
  }

  _onFormRef = f => {
    this.form = f
  }

  onChange = values => {
    this.setState({
      ...values,
      error: null
    })
  }

  onSubmit = () => {
    const { data: { symbol: updatingSymbol } } = this.props

    const { name, symbol, decimals, contractAddress } = this.state

    const values = {
      name,
      symbol,
      decimals: toFloat(decimals),
      contractAddress: contractAddress.toLowerCase()
    }

    if (updatingSymbol) {
      return this.submitUpdateToken(values)
    }

    return this.submitAddToken(values)
  }

  submitUpdateToken (values) {
    const { data: { symbol: updatingSymbol } } = this.props
    const { updateCustomToken } = this.props.actions

    this.setState({
      submitting: true,
      error: null
    }, () => {
      updateCustomToken(updatingSymbol, values)
        .then(() => this.close())
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  submitAddToken (values) {
    const { addCustomToken } = this.props.actions
    const { symbol } = values

    this.setState({
      submitting: true,
      error: null
    }, () => {
      addCustomToken(symbol, values)
      .then(() => {
        toast(t('toast.customTokenSaved'))

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

  validate = (values = {}) => {
    const ret = {}

    if (!values.symbol) {
      ret.symbol = Form.VALIDATION_RESULT.MISSING
    }

    if (!values.decimals) {
      ret.decimals = Form.VALIDATION_RESULT.MISSING
    } else {
      const decInt = toFloat(values.decimals)

      if (null === decInt || `${decInt}` !== values.decimals) {
        ret.decimals = Form.VALIDATION_RESULT.INCORRECT
      }
    }

    if (!values.contractAddress) {
      ret.contractAddress = Form.VALIDATION_RESULT.MISSING
    } else if (!isAddress(values.contractAddress)) {
      ret.contractAddress = Form.VALIDATION_RESULT.INCORRECT
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

  _onConfirmDelete = () => {
    const { data: { symbol } } = this.props

    const { removeCustomToken } = this.props.actions

    this.setState({
      submitting: true,
      error: null
    }, () => {
      removeCustomToken(symbol)
        .then(() => {
          toast(t('toast.customTokenDeleted'))

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
    const { hideEditTokenModal } = this.props.actions

    hideEditTokenModal()
  }
}
