import React, { PureComponent } from 'react'
import Form from 'react-native-advanced-forms'

import { prefixedWith0x, prefixWith0x } from '../../../../../utils/string'
import { connectStore } from '../../../../helpers/redux'
import { t } from '../../../../../../common/strings'
import ProgressButton from '../../../../components/ProgressButton'
import TextInput from '../../../../components/TextInput'
import ErrorBox from '../../../../components/ErrorBox'
import ScrollView from '../../../../components/ScrollView'
import FormWrapper from '../../../../components/FormWrapper'
import AccountPicker from '../../../liveComponents/AccountPicker'
import styles from './styles'
import formStyles from '../../../../styles/forms'


@connectStore('account')
export default class Edit extends PureComponent {
  constructor (props, ctx) {
    super(props, ctx)

    const { params: form } = this.props

    this.state = {
      generating: false,
      error: null,
      form
    }
  }

  render () {
    const {
      error,
      generating,
      form: { address, data }
    } = this.state

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
              name='address'
              label={t('modal.signData.field.addressLabel')}
              style={styles.field}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <AccountPicker selected={address} />
            </Form.Field>
            <Form.Field
              name='data'
              label={t('modal.signData.field.dataLabel')}
              style={styles.field}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <TextInput
                value={data}
                style={styles.textInput}
                placeholder={t('modal.signData.field.dataPlaceholder')}
                multiline={true}
                numberOfLines={2}
              />
            </Form.Field>
          </Form>
        </FormWrapper>
        <ProgressButton
          showInProgress={generating}
          title={t('button.generateSignature')}
          onPress={this.submit}
          style={styles.formButton}
        />
        <ErrorBox error={error} style={styles.errorBox} />
      </ScrollView>
    )
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


  _onChange = values => {
    const form = values

    // data and addresses must have 0x prefix
    ;[ 'data', 'address' ].forEach(f => {
      if (form[f] && !prefixedWith0x(form[f])) {
        form[f] = prefixWith0x(form[f])
      }
    })

    this.setState({ form })
  }

  _onSubmit = () => {
    this._generateSignedData()
  }

  _validate = values => {
    const ret = {}

    if (!values.address) {
      ret.address = Form.VALIDATION_RESULT.MISSING
    }

    if (!values.data) {
      ret.data = Form.VALIDATION_RESULT.MISSING
    }

    return ret
  }

  _generateSignedData () {
    const { form, form: { address, data } } = this.state
    const { generateSignedData } = this.props.actions

    this.setState({
      error: null,
      generating: true
    }, () => {
      generateSignedData(address, data)
        .then(signature => {
          this.setState({
            generating: false
          }, () => {
            const { onGeneratedSignature } = this.props

            onGeneratedSignature(form, signature)
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
