import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import Form from 'react-native-advanced-forms'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import Switch from '../../../components/Switch'
import TitleText from '../../../components/TitleText'
import TextInput from '../../../components/TextInput'
import ErrorBox from '../../../components/ErrorBox'
import AccountAddressPicker from '../../../components/AccountAddressPicker'
import styles from './styles'
import formStyles from '../../../styles/forms'


@connectStore('account', 'api', 'modals')
export default class SendTransaction extends PureComponent {
  constructor (props, ctx) {
    super(props, ctx)

    const { getTx, getLastGasPrice } = props.selectors
    const { from, to, value, gas, data } = getTx()

    this.state = {
      generating: false,
      submitting: false,
      error: null,
      form: {
        from,
        to,
        amount: value,
        gas,
        data,
        unit: 'ETH',
        gasPrice: getLastGasPrice(),
        isContractCreation: (!to && !!data)
      },
      rawTx: null
    }
  }

  render () {
    const { error, receipt } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this._dismissModal}
      >
        <TitleText
          style={styles.titleText}
          text={t('title.sendTransaction')}
        />
        {receipt ? this.renderReceipt(receipt) : this.renderForm()}
        <ErrorBox error={error} />
      </Modal>
    )
  }

  renderReceipt (receipt) {
    return (
      <View>
        <Text>Receipt: {receipt}</Text>
        <Button title={t('button.close')} onPress={this._dismissModal} />
      </View>
    )
  }

  renderForm () {
    const {
      rawTx,
      form: { from, to, unit, value, gas, data, gasPrice, isContractCreation }
    } = this.state

    return (
      <Form
        style={styles.form}
        ref={this._onFormRef}
        onChange={this._onChange}
        onSubmit={this._onSubmit}
        validate={this._validate}
      >
        <Form.Field
          name='isContractCreation'
          style={styles.field}
        >
          <Switch
            turnedOn={isContractCreation}
            label={t(`modal.sendTransaction.isContractCreationFieldLabel`)}
            labelTextStyle={styles.switchLabelText}
          />
        </Form.Field>
        <Form.Field
          name='from'
          label={t('modal.sendTransaction.fromFieldLabel')}
          style={styles.field}
          labelStyle={formStyles.label}
          labelTextStyle={formStyles.labelText}
        >
          <AccountAddressPicker
            options={this._getFromOptions()}
            selected={from}
          />
        </Form.Field>
        {isContractCreation ? null : (
          <Form.Field
            name='to'
            label={t('modal.sendTransaction.toFieldLabel')}
            style={styles.field}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              value={to}
              style={styles.textInput}
              placeholder={t('modal.sendTransaction.toInputPlaceholder')}
            />
          </Form.Field>
        )}
        <Form.Field
          name='amount'
          label={t('modal.sendTransaction.amountFieldLabel')}
          style={styles.field}
          labelStyle={formStyles.label}
          labelTextStyle={formStyles.labelText}
        >
          <TextInput
            value={data}
            style={styles.textInput}
            placeholder={t('modal.sendTransaction.amountInputPlaceholder', { unit })}
          />
        </Form.Field>
        <Form.Field
          name='data'
          label={t('modal.sendTransaction.dataFieldLabel')}
          style={styles.field}
          labelStyle={formStyles.label}
          labelTextStyle={formStyles.labelText}
        >
          <TextInput
            value={data}
            style={styles.textInput}
            placeholder={t('modal.sendTransaction.dataInputPlaceholder')}
            multiline={true}
            numberOfLines={2}
          />
        </Form.Field>
        {rawTx ? (
          <React.Fragment>
            <Text>{rawTx}</Text>
            <Button
              title={t('button.confirmAndSendTransaction')}
              onPress={this._confirmAndSend}
              style={styles.formButton}
            />
          </React.Fragment>
        ) : (
          <Button
            title={t('button.generateRawTransaction')}
            onPress={this._generateRawTx}
            style={styles.formButton}
          />
        )}
      </Form>
    )
  }

  _getFromOptions () {
    const { getAccounts } = this.props.selectors

    const accounts = getAccounts()

    return Object.keys(accounts).map(address => ({
      ...accounts[address],
      address
    }))
  }

  _confirmAndSend = () => {
    const { rawTx } = this.state

    this.setState({
      error: null
    }, () => {
      this.props.actions.sendRawTransaction(rawTx)
        .then(receipt => {
          this.setState({
            receipt
          })
        })
        .catch(error => {
          this.setState({ error })
        })
    })
  }

  _generateRawTx = () => {
    const { getTx } = this.props.selectors

    const { from, to, value, data } = getTx()

    const { gasLimit, gasPrice } = this._gas()

    this.setState({
      rawTx: null,
      error: null
    }, () => {
      this.props.actions.generateRawTransaction({
        from, to, value, data, gasLimit, gasPrice
      })
        .then(rawTx => {
          this.setState({
            rawTx
          })
        })
        .catch(error => {
          this.setState({ error })
        })
    })
  }

  _dismissModal = () => {
    const { receipt } = this.state

    // only cancel tx if not already succeeded
    if (!receipt) {
      this.props.actions.cancelTransaction(t('error.userCancelledTransaction'))
    } else {
      this.props.actions.hideSendTransactionModal()
    }
  }

  _onFormRef = r => {
    this.form = r
  }

  _onChange = form => {
    this.setState({ form })
  }

  _onSubmit = () => {
    console.log('submit')
  }

  _validate = values => {
    const ret = {}

    if (!values.from) {
      ret.from = Form.VALIDATION_RESULT.MISSING
    }

    if (!values.to && !values.isContractCreation) {
      ret.to = Form.VALIDATION_RESULT.MISSING
    }

    if (!values.data && values.isContractCreation) {
      ret.data = Form.VALIDATION_RESULT.MISSING
    }

    if (values.amount && Number.isNaN(parseInt(values.amount, 10))) {
      ret.data = Form.VALIDATION_RESULT.INCORRECT
    }

    return ret
  }
}
