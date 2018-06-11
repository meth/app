import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { isWeb } from '../../../utils/deviceInfo'

export default class CustomScrollView extends PureComponent {
  static propTypes = {
    useKeyboardAvoidingScrollView: PropTypes.bool
  }

  static defaultProps = {
    useKeyboardAvoidingScrollView: true
  }

  render () {
    const { useKeyboardAvoidingScrollView, ...props } = this.props

    return (useKeyboardAvoidingScrollView && !isWeb) ? (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardOpeningTime={150}
        enableResetScrollToCoords={true}
        {...props}
      />
    ) : (
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        overScrollMode='never'
        {...props}
      />
    )
  }
}
