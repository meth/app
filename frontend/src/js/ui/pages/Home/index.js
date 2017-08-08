import React, { Component } from 'react'

// import dispatcher from '../../../data/dispatcher'

export default class Page extends Component {
  render () {
    return (
      <div>
        <p>test</p>
        <webview src="https://github.com" style={{
          display: 'inline-flex',
          width: '640px',
          height: '480px',
          border: '1px solid #000',
        }} />
      </div>
    )
  }
}
