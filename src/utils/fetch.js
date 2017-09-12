import Q from 'bluebird'
import { stringify } from 'query-string'

import {
  CorruptDataError,
  UnableToConnectError,
  RequestTimeoutError
} from './errors'
const log = require('./log').create('fetch')

const TIMEOUT = 10

const logRequestDuration = startTime => {
  log.debug(`Request took: ${Date.now() - startTime}ms`)
}

export const loadJSON = async (
  url,
  method = 'GET',
  query = {},
  body = {},
  headers = {}
) => {
  log.debug(
    `${method.toUpperCase()} [${url}] headers=${JSON.stringify(headers)}`
  )

  headers['Content-Type'] = 'application/json'

  const req = {
    cache: 'no-cache',
    method,
    headers
  }

  if ('GET' !== method) {
    req.body = JSON.stringify(body)
  }

  url = `${url}?${stringify(query)}`

  log.debug(`${method.toUpperCase()}`, url, req)

  const startTime = Date.now()

  let res

  try {
    res = await new Q((resolve, reject) => {
      Q.cast(fetch(url, req)).then(resolve, reject)

      setTimeout(() => {
        reject(new RequestTimeoutError('Fetch timed out'))
      }, TIMEOUT * 1000)
    })
  } catch (err) {
    // basic error parsing
    const err2 =
      0 <=
      err
        .toString()
        .toLowerCase()
        .indexOf('failed to fetch')
        ? new UnableToConnectError('Fetch failed')
        : err

    logRequestDuration(startTime)

    log.debug(`Got error`, err2)

    throw err2
  }

  logRequestDuration(startTime)

  log.debug(`Got response: ${res.status}`)

  if (400 <= res.status) {
    throw new Error(`HTTP status: ${res.status}`)
  } else {
    try {
      const json = await res.json()

      log.debug('JSON', json)

      return json
    } catch (err) {
      throw new CorruptDataError('Parsing failed')
    }
  }
}
