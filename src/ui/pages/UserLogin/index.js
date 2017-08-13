import React, { Component } from 'react'
import { Text } from 'react-native'

import { connectRedux } from '../../helpers/decorators'


@connectRedux()
export default class Page extends Component {
  render () {
    return (
      <Text>user login</Text>
    )
  }
}
