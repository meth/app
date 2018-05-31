import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { CachePureComponent } from '../../../helpers/components'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import ModalFilterPicker from '../../../components/ModalFilterPicker'
import Button from '../../../components/Button'
import IconButton from '../../../components/IconButton'
import styles from './styles'


@connectStore('account')
export default class BookmarksModal extends CachePureComponent {
  static propTypes = {
    onSelectBookmark: PropTypes.func.isRequired,
    onEditBookmark: PropTypes.func.isRequired
  }

  render () {
    return (
      <ModalFilterPicker
        title={t('title.bookmarks')}
        ref={this._onPickerRef}
        options={this._getOptions()}
        renderOption={this._renderPickerOption}
        renderButton={this._renderPickerButton}
      />
    )
  }

  _onPickerRef = r => {
    this.picker = r
  }

  _renderPickerOption = ({ value, label }) => {
    const { onEditBookmark } = this.props

    return (
      <Button
        type='tableRow'
        style={styles.optionButton}
        onPress={this.bind(this._onSelectBookmark, value)}
        childShouldInheritTextStyle={false}
      >
        <View style={styles.optionLeft}>
          <Text style={styles.labelText} numberOfLines={1}>{label}</Text>
          <Text style={styles.urlText} numberOfLines={1}>{value}</Text>
        </View>
        <View style={styles.optionRight}>
          <IconButton
            type='textWithBorder'
            icon={{ name: 'pencil' }}
            style={styles.editButton}
            onPress={this.bind(onEditBookmark, value, label)}
          />
        </View>
      </Button>
    )
  }

  _renderPickerButton = () => null

  _onSelectBookmark = url => {
    const { onSelectBookmark } = this.props

    onSelectBookmark(url)

    this.hide()
  }

  show = () => {
    this.picker.open()
  }

  hide = () => {
    this.picker.close()
  }

  _getOptions () {
    const { getBookmarks } = this.props.selectors

    const marks = getBookmarks()

    return marks.map(({ url, label }) => ({
      value: url,
      label
    }))
  }
}
