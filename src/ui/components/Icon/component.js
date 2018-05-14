import React, { PureComponent } from 'react'

import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import IonIcon from 'react-native-vector-icons/dist/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons'

export default class Icon extends PureComponent {
  render () {
    const { name } = this.props

    if (FAIcon.hasIcon(name)) {
      return <FAIcon {...this.props} />
    }

    if (IonIcon.hasIcon(name)) {
      return <IonIcon {...this.props} />
    }

    return <MaterialCommunityIcon {...this.props} />
  }
}
