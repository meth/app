import React from 'react'
import ReactDOM from 'react-dom'

export const NAME = 'ConnectToNode'

export const show = () => {
  ReactDOM.render(
    <div>connect to node</div>,
    document.getElementById('react-root')
  )
}
