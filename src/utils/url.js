// https://abc -> abc
export const trimProtocol = url => {
  const protPos = url.indexOf('://')

  return 0 <= protPos ? url.substr(protPos + 3) : url
}

export const addProtocol = (url, protocol = 'http') => {
  const protPos = url.indexOf('://')

  return 0 > protPos ? `${protocol}://${url}` : url
}
