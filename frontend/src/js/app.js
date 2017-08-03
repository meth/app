import Main from './windows/Main'
import ConnectToNode from './windows/ConnectToNode'

let hash = window.location.hash.match(/#([a-zA-Z0-9]*)/)
hash = (hash && 1 < hash.length) ? hash[1] : 'Main'

let matched = false

;[
  ConnectToNode,
  Main,
].forEach(comp => {
  if (hash === comp.NAME) {
    console.log(`Window matched: ${comp.NAME}`)
    matched = true
    comp.show()
  }
})

if (!matched) {
  console.error(`No window matching hash: ${hash}`)
}
