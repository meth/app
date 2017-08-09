import React, { Component } from 'react'

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
}
