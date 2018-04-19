import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import Form from 'react-native-advanced-forms'
import { isAddress, isHexStrict } from 'web3-utils'

import { DEFAULT_GAS_LIMIT } from '../../../../../common/constants/protocol'
import { toInt, toFloat, toIntStr, weiToEthStr, toTokenBalanceStr, calculateTotalGasBN, ethToWeiBN } from '../../../../utils/number'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import ProgressButton from '../../../components/ProgressButton'
import Switch from '../../../components/Switch'
import TitleText from '../../../components/TitleText'
import Icon from '../../../components/Icon'
import TextInput from '../../../components/TextInput'
import ErrorBox from '../../../components/ErrorBox'
import Picker from '../../../components/Picker'
import AddressBookPicker from '../../pickers/AddressBookPicker'
import AccountPicker from '../../pickers/AccountPicker'
import styles from './styles'
import formStyles from '../../../styles/forms'

const ETH = 'ETH'


@connectStore('account', 'modals')
export default class SendTransaction extends PureComponent {
  constructor (props, ctx) {
    super(props, ctx)

    const { getTx, getLastGasPrice } = props.selectors
    const { from, to, value, gas: gasLimit, data } = getTx()

    this.state = {
      generating: false,
      submitting: false,
      error: null,
      form: {
        from,
        to,
        amount: value,
        data,
        unit: 'ETH',
        gasLimit: `${gasLimit || DEFAULT_GAS_LIMIT}`,
        gasPrice: `${getLastGasPrice()}`,
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
      form: { from, to, unit, amount, data, gasLimit, gasPrice, isContractCreation }
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
          <AccountPicker selected={from} />
        </Form.Field>
        {isContractCreation ? null : (
          <Form.Layout style={styles.toRow}>
            <Form.Field
              name='to'
              label={t('modal.sendTransaction.toFieldLabel')}
              style={styles.toField}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <TextInput
                value={to}
                style={styles.textInput}
                placeholder={t('modal.sendTransaction.toInputPlaceholder')}
              />
            </Form.Field>
            <Form.Field
              name='toLookup'
              label={' '}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <AddressBookPicker
                style={styles.toPicker}
                selected={to}
                button={{
                  theme: 'default',
                  style: styles.toPickerButton,
                  renderLabel: this._renderToPickerButtonLabel,
                  renderIcon: this._renderToPickerButtonIcon
                }}
              />
            </Form.Field>
          </Form.Layout>
        )}
        <Form.Layout style={styles.amountRow}>
          <Form.Field
            name='amount'
            label={t('modal.sendTransaction.amountFieldLabel', { amount: this._getCurrentUnitBalance() })}
            style={styles.amountField}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              value={amount}
              style={styles.textInput}
              placeholder={t('modal.sendTransaction.amountInputPlaceholder', { unit })}
            />
          </Form.Field>
          <Form.Field
            name='unit'
            label={t('modal.sendTransaction.unitFieldLabel')}
            style={styles.unitField}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <Picker
              style={styles.unitPicker}
              options={this._getUnitPickerOptions()}
              selected={unit}
              button={{
                style: styles.unitPickerButton,
                textStyle: styles.unitPickerButtonText
              }}
            />
          </Form.Field>
        </Form.Layout>
        <Form.Field
          name='data'
          label={t(
            isContractCreation
              ? 'modal.sendTransaction.contractCodeFieldLabel'
              : 'modal.sendTransaction.dataFieldLabel'
          )}
          style={styles.field}
          labelStyle={formStyles.label}
          labelTextStyle={formStyles.labelText}
        >
          <TextInput
            value={data}
            style={styles.textInput}
            placeholder={t(
              isContractCreation
                ? 'modal.sendTransaction.contractCodeInputPlaceholder'
                : 'modal.sendTransaction.dataInputPlaceholder'
            )}
            multiline={true}
            numberOfLines={2}
          />
        </Form.Field>
        <Form.Layout style={styles.gasRow}>
          <Form.Field
            name='gasLimit'
            label={t('modal.sendTransaction.gasLimitFieldLabel')}
            style={styles.gasLimitField}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              value={gasLimit}
              style={styles.textInput}
              placeholder={t('modal.sendTransaction.gasLimitInputPlaceholder')}
            />
          </Form.Field>
          <Form.Field
            name='gasPrice'
            label={t('modal.sendTransaction.gasPriceFieldLabel')}
            style={styles.gasPriceField}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              value={gasPrice}
              style={styles.textInput}
              placeholder={t('modal.sendTransaction.gasPriceInputPlaceholder')}
            />
          </Form.Field>
        </Form.Layout>
        <View style={styles.totalCost}>
          <Text style={styles.totalCostText}>
            {t('modal.sendTransaction.totalCost', { cost: this._getTotalCost() })}
          </Text>
        </View>
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
          <ProgressButton
            title={t('button.generateRawTransaction')}
            onPress={this._generateRawTx}
            style={styles.formButton}
          />
        )}
      </Form>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    // re-calculate the gas limit for certain changes
    let shouldRecalculate = false
    ;[ 'unit', 'to', 'data' ].forEach(f => {
      if (this.state.form[f] !== prevState.form[f]) {
        shouldRecalculate = true
      }
    })

    if (shouldRecalculate) {
      this._recalculateGasLimit()
    }
  }

  componentDidMount () {
    this._recalculateGasLimit()
  }

  _recalculateGasLimit = _.debounce(() => {
    const { form, form: { from, to, gasLimit } } = this.state
    const { fetchRecommendedGasLimit } = this.props.actions

    // both from and to
    if (!from || !to) {
      return
    }

    fetchRecommendedGasLimit(form)
      .then(estimate => {
        // only update if estimate is greater than what user currently has
        if (!gasLimit || toInt(estimate) > toInt(gasLimit)) {
          this.setState({
            form: {
              ...form,
              gasLimit: toIntStr(estimate)
            }
          })
        }
      })
      .catch(() => { /* do nothing */ })
  }, 1000)

  _onFormRef = r => {
    this.form = r
  }

  _getTotalCost () {
    const { form: { gasLimit, gasPrice, unit, amount } } = this.state

    const parsedGasLimit = toInt(gasLimit)
    const parsedGasPrice = toInt(gasPrice)
    if (!parsedGasLimit || !parsedGasPrice) {
      return ''
    }

    let totalWei = calculateTotalGasBN(gasLimit, gasPrice)

    // if transferring ETH
    const parsedAmount = toFloat(amount)
    if (ETH === unit && parsedAmount) {
      totalWei = totalWei.add(ethToWeiBN(parsedAmount))
    }

    return weiToEthStr(totalWei)
  }

  _getCurrentUnitBalance () {
    const { form: { from, unit } } = this.state

    const { getAccounts, getTokenList } = this.props.selectors

    let amountStr = t('ethBalance.unknown')
    if (ETH === unit) {
      const { balance } = _.get(getAccounts(), from, {})

      if (balance) {
        amountStr = weiToEthStr(balance)
      }
    } else {
      const { tokens } = _.get(getAccounts(), from, {})
      const allTokens = getTokenList()

      amountStr = toTokenBalanceStr(tokens[unit].balance, allTokens[unit].decimals)
    }

    return amountStr
  }

  _getUnitPickerOptions () {
    const { getAccounts } = this.props.selectors
    const { form: { from } } = this.state

    const tokens = _.get(getAccounts(), from, {}).tokens || {}

    return [
      {
        value: ETH,
        label: ETH
      }
    ].concat(Object.keys(tokens).map(tok => ({ value: tok, label: tok })))
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

  _renderToPickerButtonLabel = () => (
    <Icon style={styles.toPickerButtonIcon} name='search' />
  )

  _renderToPickerButtonIcon = () => null

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

  _onChange = values => {
    const form = values

    // if "to" address looked up then set it!
    if (form.toLookup !== this.state.form.toLookup) {
      form.to = form.toLookup
    }

    form.gasLimit = toIntStr(form.gasLimit)
    form.gasPrice = toIntStr(form.gasPrice)

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

    if (!values.isContractCreation) {
      if (!values.to) {
        ret.to = Form.VALIDATION_RESULT.MISSING
      } else if (!isAddress(values.to)) {
        ret.to = Form.VALIDATION_RESULT.INCORRECT
      } else if (values.to === values.from) {
        ret.to = Form.VALIDATION_RESULT.INCORRECT
      }
    }

    if (values.isContractCreation) {
      if (!values.data) {
        ret.data = Form.VALIDATION_RESULT.MISSING
      }
    }
    if (values.data && !isHexStrict(values.data)) {
      ret.data = Form.VALIDATION_RESULT.INCORRECT
    }

    if (values.amount && null === toFloat(values.amount)) {
      ret.amount = Form.VALIDATION_RESULT.INCORRECT
    }

    if (null === toInt(values.gasLimit)) {
      ret.gasLimit = Form.VALIDATION_RESULT.INCORRECT
    }

    if (null === toInt(values.gasPrice)) {
      ret.gasPrice = Form.VALIDATION_RESULT.INCORRECT
    }

    return ret
  }
}
