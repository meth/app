import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { CachePureComponent } from '../../helpers/components'
import { t } from '../../../../common/strings'
import { mnemonicToList } from '../../../utils/mnemonic'
import { isScreenWidthSmall, isScreenWidthVerySmall } from '../../styles'
import Button from '../Button'
import Icon from '../Icon'
import Loading from '../Loading'
import styles from './styles'

export class MnemonicConfirmator extends CachePureComponent {
  static propTypes = {
    mnemonic: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    onSuccess: PropTypes.func.isRequired
  }

  state = {
    jumbled: null,
    selected: []
  }

  componentWillReceiveProps (newProps) {
    const { mnemonic: newMnemonic } = newProps
    const { mnemonic } = this.props

    if (mnemonic !== newMnemonic) {
      this.setState({
        jumbled: null
      })
    }
  }

  componentDidMount () {
    this.generateJumbledWords()
  }

  componentDidUpdate () {
    this.generateJumbledWords()

    const { selected } = this.state
    const { mnemonic, onSuccess } = this.props

    if (selected.join(' ') === mnemonic && onSuccess) {
      onSuccess()
    }
  }

  generateJumbledWords () {
    const { jumbled } = this.state
    const { mnemonic } = this.props

    if (!jumbled) {
      // we'll actually just the words alphabetically so
      // that it's easier for the user to find what they want
      const words = mnemonic.split(' ')
      words.sort()

      this.setState({
        jumbled: words,
        selected: []
      })
    }
  }

  render () {
    const { style } = this.props
    const { jumbled, selected } = this.state

    return (
      <View style={style}>
        {jumbled ? (
          <View>
            <View style={styles.mnemonicWords}>
              {jumbled.map(word => (
                <Button
                  key={word}
                  onPress={this.bind(this.onAddWord, word)}
                  title={word}
                  style={styles.wordWrapperButton}
                  textStyle={[
                    styles.wordText,
                    selected.includes(word) ? null : styles.unselectedWordText
                  ]}
                />
              ))}
            </View>
            <View style={styles.confirmedMnemonicWords}>
              {selected.map(word => (
                <Button
                  key={word}
                  onPress={this.bind(this.onRemoveWord, word)}
                  title={word}
                  style={styles.wordWrapperButton}
                  textStyle={styles.wordText}
                />
              ))}
            </View>
          </View>
        ) : (
          <Loading />
        )}
      </View>
    )
  }

  onAddWord = word => {
    const { selected } = this.state

    const index = selected.indexOf(word)
    if (0 > index) {
      selected.push(word)

      this.setState({
        selected: [ ...selected ]
      })
    }
  }

  onRemoveWord = word => {
    const { selected } = this.state

    const index = selected.indexOf(word)
    if (0 <= index) {
      selected.splice(index, 1)

      this.setState({
        selected: [ ...selected ]
      })
    }
  }
}

export class MnemonicDisplay extends PureComponent {
  static propTypes = {
    mnemonic: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    onPress: PropTypes.func
  }

  state = {
    show: false
  }

  render () {
    const { mnemonic, style } = this.props
    const { show } = this.state

    const WORDS_PER_COL = this._getWordsPerColumn()

    const columns = mnemonicToList(mnemonic).reduce((list, word, index) => {
      // eslint-disable-next-line no-bitwise
      const col = ~~(index / WORDS_PER_COL)

      if (undefined === list[col]) {
        // eslint-disable-next-line no-param-reassign
        list[col] = [ { index, word } ]
      } else {
        // eslint-disable-next-line no-param-reassign
        list[col].push({ index, word })
      }

      return list
    }, [])

    return (
      <View style={style}>
        <View style={styles.mnemonicWords}>
          <View style={styles.wordColumns}>
            {columns.map((column, idx) => (
              <View key={idx} style={styles.wordColumn}>
                {column.map(({ word, index }) => (
                  <View key={index} style={styles.wordRow}>
                    <Text style={styles.wordIndexText}>{index + 1}</Text>
                    <Text style={styles.wordText}>{word}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          {show ? null : (
            <Button
              onPress={this.onPressMask}
              type='mask'
              style={styles.maskButton}
            >
              <Icon name="lock" style={styles.maskButtonIcon} />
              <Text style={styles.maskButtonText}>
                {t('button.pressToRevealMnemonic')}
              </Text>
            </Button>
          )}
        </View>
      </View>
    )
  }

  onPressMask = () => {
    this.setState({ show: true })

    const { onPress } = this.props

    if (onPress) {
      onPress()
    }
  }

  _getWordsPerColumn () {
    let wordsPerCol = 6

    if (isScreenWidthSmall()) {
      wordsPerCol = 8

      if (isScreenWidthVerySmall()) {
        wordsPerCol = 12
      }
    }

    return wordsPerCol
  }
}
