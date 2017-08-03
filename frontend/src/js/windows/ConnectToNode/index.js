import React from 'react'
import ReactDOM from 'react-dom'

module.exports = {
  NAME: 'ConnectToNode',
  show: () => {
    ReactDOM.render(
      <div>connect to node</div>,
      document.getElementById('react-root')
    )
  }
}
