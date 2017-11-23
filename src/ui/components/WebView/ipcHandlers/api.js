import API from '../../../../../common/constants/api'

const _ensurePermission = (haystack, needle) => {
  if (!haystack.includes(needle)) {
    throw new Error(
      `Webview does not have permission to execute command: ${needle}`
    )
  }
}

export default ({ command }, permissions, { generateAddress }) => {
  switch (command) {
    case API.GENERATE_ADDRESS:
      _ensurePermission(permissions, API.GENERATE_ADDRESS)

      return generateAddress()
    default:
      return new Error('Unrecognized API command')
  }
}
