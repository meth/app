import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { routes } from '../../nav'
import controller from '../../../redux/controller'
import { t } from '../../../../common/strings'
import styles from './styles'
import ErrorBox from '../../components/ErrorBox'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import Layout from '../Layout'

export default class Page extends PureComponent {
  state = {
    mnemonic: '',
    generateNewError: null,
    inputExistingError: null
  }

  render() {
    return (
      <Layout>
        {this.renderInputExisting()}
        <View style={styles.divider} />
        {this.renderGenerateNew()}
      </Layout>
    )
  }

  renderInputExisting = () => {
    const { mnemonic, inputExistingError } = this.state

    const errorBox = !inputExistingError ? null : (
      <ErrorBox error={inputExistingError} />
    )

    return (
      <View>
        <Text>{t('mnemonic.enterYourMnemonic')}</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={mnemonic}
          onChange={this.onChange}
          onSubmitEditing={this.onSubmit}
        />
        {errorBox}
      </View>
    )
  }

  renderGenerateNew = () => {
    const { generateNewError } = this.state

    const errorBox = !generateNewError ? null : (
      <ErrorBox error={generateNewError} />
    )

    return (
      <View>
        <Button
          onPress={this.onGenerate}
          title={t('button.generateNewMnemonic')}
        />
        {errorBox}
      </View>
    )
  }

  onChange = e => {
    this.setState({
      mnemonic: e.target.value
    })
  }

  onSubmit = () => {
    this.setState(
      {
        inputExistingError: null
      },
      () => {
        controller.wallet
          .loadUsingMnemonic(this.state.mnemonic)
          .then(() => controller.nav.push(routes.Browser.path))
          .catch(inputExistingError => this.setState({ inputExistingError }))
      }
    )
  }

  onGenerate = () => {
    this.setState(
      {
        generateNewError: null
      },
      () => {
        controller.wallet
          .generateNewMnemonic()
          .then(mnemonic =>
            controller.nav.push(routes.ConfirmNewMnemonic.path, { mnemonic })
          )
          .catch(generateNewError => this.setState({ generateNewError }))
      }
    )
  }
}
