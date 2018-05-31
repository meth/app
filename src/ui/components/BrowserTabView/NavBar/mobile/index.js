import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import TextInput from '../../../TextInput'


export default class NavBar extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    onAddressInputRef: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    hasBookmark: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render () {
    const {
      style,
      onAddressInputRef,
      url,
      onChange,
      onSubmit
    } = this.props

    return (
      <View style={style}>
        <TextInput
          ref={onAddressInputRef}
          value={url}
          onChange={onChange}
          onSubmit={onSubmit}
          style={styles.navUrlInput}
          selectTextOnFocus
        />
      </View>
    )
  }
}
