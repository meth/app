import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { t } from '../../../../common/strings'
import Button from '../Button'
import Icon from '../Icon'
import styles from './styles'

export default class Mnemonic extends PureComponent {
  static propTypes = {
    mnemonic: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
  }

  state = {
    show: false
  }

  render () {
    const { mnemonic, style } = this.props
    const { show } = this.state

    return (
      <View style={[ styles.container, style ]}>
        {mnemonic.split(' ').map(word => (
          <Text key={word} style={styles.text}>{word}</Text>
        ))}
        {show ? null : (
          <Button
            onPress={this.onPressMask}
            type='mask'
            style={styles.maskButton}>
                <Icon name="lock" style={styles.maskButtonIcon} />
                <Text style={styles.maskButtonText}>
                  {t('button.pressToRevealMnemonic')}
                </Text>
          </Button>
        )}
      </View>
    )
  }

  onPressMask = () => {
    this.setState({ show: true })
  }
}
