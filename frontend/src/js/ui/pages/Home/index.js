import React, { Component } from 'react'

// import dispatcher from '../../../data/dispatcher'
import styles from './styles'

export default class Page extends Component {
  render () {
    const OverlayDiv = styles.overlayDiv()
    return (
      <div>
        <p>test</p>
        <OverlayDiv />
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
