import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { generateNewMnemonic, load as loadWallet } from '../../../../wallet/manager'
import { routes } from '../../../nav'
import logger from '../../../../utils/log'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import Layout from '../Layout'

const log = logger.create('LoginMnemonic')

@connectStore('nav')
export default class Page extends PureComponent {
  state = {
    mnemonic: '',
    generateNewError: null,
    inputExistingError: null
  }

  render () {
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
    const { actions: { navPush } } = this.props

    this.setState(
      {
        inputExistingError: null
      },
      () => {
        loadWallet(this.state.mnemonic)
          .then(() => navPush(routes.Browser.path))
          .catch(inputExistingError => {
            log.debug(inputExistingError)

            this.setState({ inputExistingError })
          })
      }
    )
  }

  onGenerate = () => {
    const { actions: { navPush } } = this.props

    this.setState(
      {
        generateNewError: null
      },
      () => {
        generateNewMnemonic()
          .then(mnemonic => (
            navPush(routes.ConfirmNewMnemonic.path, { mnemonic })
          ))
          .catch(generateNewError => {
            log.debug(generateNewError)

            this.setState({ generateNewError })
          })
      }
    )
  }
}
