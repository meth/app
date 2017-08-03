import React from 'react'
import ReactDOM from 'react-dom'

module.exports = {
  NAME: 'Main',
  show: () => {
    ReactDOM.render(
      <div>main window</div>,
      document.getElementById('react-root')
    )
  }
}
