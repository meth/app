import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import ModalFilterPicker from '../../../components/ModalFilterPicker'


@connectStore('account')
export default class BookmarksModal extends PureComponent {
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

  _renderPickerOption = ({ value, label }) => (
    <Text>{value}{label}</Text>
  )

  _renderPickerButton = () => null

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
