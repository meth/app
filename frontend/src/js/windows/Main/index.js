import React from 'react'
import ReactDOM from 'react-dom'

export const NAME = 'Main'

export const show = () => {
  ReactDOM.render(
    <div>main window</div>,
    document.getElementById('react-root')
  )
}
