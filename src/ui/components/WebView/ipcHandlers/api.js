import API from '../../../../constants/api'

const _ensurePermission = (haystack, needle) => {
  if (!haystack.includes(needle)) {
    throw new Error(
      `Webview does not have permission to execute command: ${needle}`
    )
  }
}

export default ({ command }, permissions, { generateAccount }) => {
  switch (command) {
    case API.CREATE_ACCOUNT:
      _ensurePermission(permissions, API.CREATE_ACCOUNT)

      return generateAccount()
    default:
      return new Error('Unrecognized API command')
  }
}
