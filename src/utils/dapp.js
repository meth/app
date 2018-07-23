import { parse } from 'url'

export const createDappId = ({ url }) => {
  const parsed = parse(url)
  let { host } = parsed

  if (host.substr(0, 4) === 'www.') {
    host = host.substr(4)
  }

  return host
}

export const extractAddressPermissions = dappPermissions =>
  Object.keys(dappPermissions || {}).filter(k => k.startsWith('0x')).reduce(
    (m, v) => ({
      ...m,
      [v]: dappPermissions[v]
    }),
    {}
  )
