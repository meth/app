import React, { Component } from 'react'

import dispatcher from '../../../data/dispatcher'
import { connectRedux } from '../../helpers/decorators'

@connectRedux()
export default class Page extends Component {
  render () {
    return (
      <div>
        <p>user login</p>
      </div>
    )
  }

  componentDidMount () {
    dispatcher.init()
  }
}
