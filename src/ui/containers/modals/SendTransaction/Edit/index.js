import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import Form from 'react-native-advanced-forms'

import { ETH } from '../../../../../../common/constants/protocol'
import { toInt, toFloat, toIntStr, weiToEthStr, toTokenBalanceStr, calculateTotalGasBN, ethToWeiBN } from '../../../../../utils/number'
import { isAddress, isHexStrict, prefixedWith0x, prefixWith0x } from '../../../../../utils/string'
import { connectStore } from '../../../../helpers/redux'
import { t } from '../../../../../../common/strings'
import ProgressButton from '../../../../components/ProgressButton'
import Switch from '../../../../components/Switch'
import TextInput from '../../../../components/TextInput'
import ErrorBox from '../../../../components/ErrorBox'
import Picker from '../../../../components/Picker'
import Loading from '../../../../components/Loading'
import AddressTextInput from '../../../liveComponents/AddressTextInput'
import AccountPicker from '../../../liveComponents/AccountPicker'
import styles from './styles'
import formStyles from '../../../../styles/forms'
import { getMaxCost } from '../utils'


@connectStore('account')
export default class Edit extends PureComponent {
  constructor (props, ctx) {
    super(props, ctx)

    const { params: form } = this.props

    this.state = {
      fetchingGasEstimate: false,
      generating: false,
      error: null,
      form
    }
  }

  render () {
    const {
      error,
      generating,
      fetchingGasEstimate,
      form: { from, to, unit, amount, data, gasLimit, gasPrice, isContractCreation }
    } = this.state

    const isTokenTransfer = (ETH !== unit)

    return (
      <Form
        style={styles.form}
        ref={this._onFormRef}
        onChange={this._onChange}
        onSubmit={this._onSubmit}
        validate={this._validate}
        submitOnReturn={false}
      >
        <Form.Field
          name='isContractCreation'
          style={styles.field}
        >
          <Switch
            turnedOn={isContractCreation}
            label={t(`modal.sendTransaction.field.isContractCreationLabel`)}
            labelTextStyle={styles.switchLabelText}
          />
        </Form.Field>
        <Form.Field
          name='from'
          label={t('modal.sendTransaction.field.fromLabel')}
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
              label={t('modal.sendTransaction.field.toLabel')}
              style={styles.toField}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <AddressTextInput
                value={to}
                style={styles.textInput}
                placeholder={t('modal.sendTransaction.field.toPlaceholder')}
              />
            </Form.Field>
          </Form.Layout>
        )}
        <Form.Layout style={styles.amountRow}>
          <Form.Field
            name='amount'
            label={t('modal.sendTransaction.field.amountWithAvailableLabel', { amount: this._getCurrentUnitBalance() })}
            style={styles.amountField}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              value={amount}
              style={styles.textInput}
              placeholder={t('modal.sendTransaction.field.amountPlaceholder', { unit })}
            />
          </Form.Field>
          <Form.Field
            name='unit'
            label={t('modal.sendTransaction.field.unitLabel')}
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
        {isTokenTransfer ? null : (
          <Form.Field
            name='data'
            label={t(
              isContractCreation
                ? 'modal.sendTransaction.field.contractCodeLabel'
                : 'modal.sendTransaction.field.dataLabel'
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
                  ? 'modal.sendTransaction.field.contractCodePlaceholder'
                  : 'modal.sendTransaction.field.dataPlaceholder'
              )}
              multiline={true}
              numberOfLines={2}
            />
          </Form.Field>
        )}
        <Form.Layout style={styles.gasRow}>
          <Form.Field
            name='gasLimit'
            label={t('modal.sendTransaction.field.gasLimitLabel')}
            style={styles.gasLimitField}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
            labelRightContent={fetchingGasEstimate ? <Loading /> : null}
          >
            <TextInput
              value={gasLimit}
              style={styles.textInput}
              placeholder={t('modal.sendTransaction.field.gasLimitPlaceholder')}
            />
          </Form.Field>
          <Form.Field
            name='gasPrice'
            label={t('modal.sendTransaction.field.gasPriceLabel')}
            style={styles.gasPriceField}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              value={gasPrice}
              style={styles.textInput}
              placeholder={t('modal.sendTransaction.field.gasPricePlaceholder')}
            />
          </Form.Field>
        </Form.Layout>
        <View style={styles.maxCost}>
          <Text style={styles.maxCostText}>
            {t('modal.sendTransaction.maxCost', {
              cost: getMaxCost({ gasLimit, gasPrice, unit, amount })
            })}
          </Text>
        </View>
        <ProgressButton
          showInProgress={generating}
          title={t('button.generateRawTransaction')}
          onPress={this.submit}
          style={styles.formButton}
        />
        <ErrorBox error={error} style={styles.errorBox} />
      </Form>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    // re-calculate the gas limit for certain changes
    let shouldRecalculate = false
    ;[ 'unit', 'to', 'data', 'amount', 'isContractCreation' ].forEach(f => {
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

  submit = () => {
    if (this.form) {
      this.form.validateAndSubmit()
    }
  }

  _recalculateGasLimit = _.debounce(() => {
    const { form, form: { from, to, gasLimit, isContractCreation } } = this.state
    const { fetchRecommendedGasLimit } = this.props.actions

    if (!from) {
      return
    }

    if (!isContractCreation && !to) {
      return
    }

    this.setState({
      fetchingGasEstimate: true
    }, () => {
      fetchRecommendedGasLimit(form)
        .then(estimate => {
          let toUpdate = {}
          // only update if estimate is greater than what user currently has
          if (!gasLimit || toInt(estimate) > toInt(gasLimit)) {
            toUpdate = {
              form: {
                ...form,
                gasLimit: toIntStr(estimate)
              }
            }
          }

          this.setState({
            fetchingGasEstimate: false,
            ...toUpdate
          })
        })
        .catch(() => {
          this.setState({
            fetchingGasEstimate: false
          })
        })
    })
  }, 1000)

  _onFormRef = r => {
    this.form = r
  }

  _getMaxCost () {
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

      amountStr = toTokenBalanceStr(tokens[unit], allTokens[unit].decimals)
    }

    return amountStr
  }

  _getUnitPickerOptions () {
    const { getAccounts } = this.props.selectors
    const { form: { from, isContractCreation } } = this.state

    const tokens = _.get(getAccounts(), from, {}).tokens || {}

    const options = [
      {
        value: ETH,
        label: ETH
      }
    ]

    return isContractCreation ? options : options.concat(
      Object.keys(tokens).map(tok => ({ value: tok, label: tok }))
    )
  }

  _onChange = values => {
    const form = values

    // lowercase the "to" address
    if (form.to) {
      form.to = form.to.toLowerCase()
    }

    // if toggled to contract deployment then set unit to ETH and set amount to 0
    if (form.isContractCreation !== this.state.form.isContractCreation) {
      form.unit = ETH
      form.amount = '0'
    }

    // if unit is not ETH then it's a token transfer, so nullify data
    if (ETH !== form.unit) {
      form.data = ''
    }

    // data and addresses must have 0x prefix
    [ 'data', 'to', 'from' ].forEach(f => {
      if (form[f] && !prefixedWith0x(form[f])) {
        form[f] = prefixWith0x(form[f])
      }
    })

    form.gasLimit = toIntStr(form.gasLimit)
    form.gasPrice = toIntStr(form.gasPrice)

    this.setState({
      form,
      /* will need to re-generate raw tx */
      rawTx: null
    })
  }

  _onSubmit = () => {
    this._generateRawTransaction()
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

  _generateRawTransaction () {
    const { form } = this.state
    const { generateRawTransaction } = this.props.actions

    this.setState({
      error: null,
      generating: true
    }, () => {
      generateRawTransaction(form)
        .then(rawTx => {
          this.setState({
            generating: false
          }, () => {
            const { onGeneratedRawTransaction } = this.props

            onGeneratedRawTransaction(form, rawTx)
          })
        })
        .catch(error => {
          this.setState({
            generating: false,
            error
          })
        })
    })
  }
}
