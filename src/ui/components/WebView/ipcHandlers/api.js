const _ensurePermission = (haystack, needle) => {
  if (!haystack[needle]) {
    throw new Error(
      `Webview does not have permission to execute command: ${needle}`
    )
  }
}

export default (payload, permissions, apiMethods) => {
  const { command } = payload

  _ensurePermission(permissions, command)

  return apiMethods[command](payload)
}
