import { parse } from 'url'

export const createDappId = ({ url }) => {
  let { host } = parse(url)

  if (host.substr(0, 4) === 'www.') {
    host = host.substr(4)
  }

  return host
}
