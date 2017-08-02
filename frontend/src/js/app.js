import Main from './windows/Main'
import ConnectToNode from './windows/ConnectToNode'

const hash = window.location.hash.match(/#([a-zA-Z]*)/)

;[
  ConnectToNode,
  Main,
].forEach(comp => {
  if (hash === comp.NAME) {
    comp.show()
  }
})
