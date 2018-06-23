import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import Form from 'react-native-advanced-forms'

import { ETH } from '../../../../../../common/constants/protocol'
import { toInt, toFloat, toFloatStr, toIntStr, weiToEthBigNum, toDecStr, toTokenBalanceBigNum } from '../../../../../utils/number'
import { isAddress, isHexStrict, prefixedWith0x, prefixWith0x } from '../../../../../utils/string'
import { connectStore } from '../../../../helpers/redux'
import { t } from '../../../../../../common/strings'
import ProgressButton from '../../../../components/ProgressButton'
import Switch from '../../../../components/Switch'
import TextInput from '../../../../components/TextInput'
import ErrorBox from '../../../../components/ErrorBox'
import ScrollView from '../../../../components/ScrollView'
import Picker from '../../../../components/Picker'
import FormWrapper from '../../../../components/FormWrapper'
import Loading from '../../../../components/Loading'
import LinkButton from '../../../../components/LinkButton'
import AddressTextInput from '../../../liveComponents/AddressTextInput'
import AccountPicker from '../../../liveComponents/AccountPicker'
import styles from './styles'
import formStyles from '../../../../styles/forms'
import {
  getMaxCostEthWithSuffixStr,
  recalculateAmountBasedOnMaxCostAndAvailableBalance
} from '../utils'


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
      <ScrollView contentContainerStyle={styles.form}>
        <FormWrapper style={styles.form}>
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
                label={t('modal.sendTransaction.field.amountLabel')}
                style={styles.amountField}
                labelStyle={formStyles.label}
                labelTextStyle={formStyles.labelText}
                labelRightContent={this._renderSetMaxAmountLinkButton()}
              >
                <TextInput
                  value={toFloatStr(amount)}
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
                  value={toIntStr(gasLimit)}
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
                  value={toIntStr(gasPrice)}
                  style={styles.textInput}
                  placeholder={t('modal.sendTransaction.field.gasPricePlaceholder')}
                />
              </Form.Field>
            </Form.Layout>
            <View style={styles.maxCost}>
              <Text style={formStyles.labelText}>{t('modal.sendTransaction.maxCost')}</Text>
              <Text style={styles.maxCostText}>
                {getMaxCostEthWithSuffixStr({ gasLimit, gasPrice, unit, amount })}
              </Text>
            </View>
          </Form>
        </FormWrapper>
        <ProgressButton
          showInProgress={generating}
          title={t('button.generateRawTransaction')}
          onPress={this.submit}
          style={styles.formButton}
        />
        <ErrorBox error={error} style={styles.errorBox} />
      </ScrollView>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    // re-calculate the gas limit for certain changes
    const changed = {}
    ;[ 'unit', 'to', 'data', 'amount', 'gasLimit', 'gasPrice', 'isContractCreation' ].forEach(f => {
      if (this.state.form[f] !== prevState.form[f]) {
        changed[f] = true
      }
    })

    if (!_.isEmpty(changed)) {
      this._recalculateGasLimit()
    }

    // if either gas limit, gas price or amount changed then recalculate amount
    if (changed.amount || changed.gasLimit || changed.gasPrice) {
      this._recalculateAmountBasedOnUpdatedMaxCost()
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

  _onScrollViewRef = ref => {
    this.scrollView = ref
  }

  _getScrollView = () => this.scrollView

  _recalculateAmountBasedOnUpdatedMaxCost = () => {
    const { form, form: { gasLimit, gasPrice, unit, amount } } = this.state

    if (!gasLimit || !gasPrice) {
      return
    }

    // recalculate amount based on new max cost
    const newAmount = recalculateAmountBasedOnMaxCostAndAvailableBalance(
      { gasLimit, gasPrice, unit, amount },
      this._getCurrentUnitBalance()
    )

    if (newAmount !== amount) {
      this.setState({
        form: {
          ...form,
          amount: newAmount
        }
      })
    }
  }

  _recalculateGasLimit = _.debounce(() => {
    const { form, form: { from, gasPrice, to, gasLimit, isContractCreation } } = this.state
    const { fetchRecommendedGasLimit } = this.props.actions

    if (!from || !gasPrice) {
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
          const newFormValues = {}

          // update limit if estimate is greater than what user currently has
          if (!gasLimit || toInt(estimate) > toInt(gasLimit)) {
            newFormValues.gasLimit = toIntStr(estimate)
          }

          this.setState({
            fetchingGasEstimate: false,
            form: {
              ...form,
              ...newFormValues
            }
          })
        })
        .catch(() => {
          this.setState({
            fetchingGasEstimate: false
          })
        })
    })
  }, 250)

  _onFormRef = r => {
    this.form = r
  }

  _renderSetMaxAmountLinkButton () {
    return (
      <LinkButton
        style={styles.setMaxAmountButton}
        textStyle={styles.setMaxAmountButtonText}
        type='text'
        title={t('button.setMax')}
        tooltip={t('tooltip.setMaximumAmount')}
        onPress={this._onPressSetMaxAmount}
      />
    )
  }

  _onPressSetMaxAmount = () => {
    this.setState({
      form: {
        ...this.state.form,
        amount: this._getCurrentUnitBalance()
      }
    })
  }

  _getCurrentUnitBalance () {
    const { form: { from, unit } } = this.state

    const { getAccounts, getTokenList } = this.props.selectors

    let amountStr = t('ethBalance.unknown')
    if (ETH === unit) {
      const { balance } = _.get(getAccounts(), from, {})

      if (balance) {
        amountStr = toDecStr(weiToEthBigNum(balance))
      }
    } else {
      const { tokens } = _.get(getAccounts(), from, {})
      const allTokens = getTokenList()

      amountStr = toDecStr(toTokenBalanceBigNum(tokens[unit], allTokens[unit].decimals))
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
