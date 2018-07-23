import { stringify } from 'query-string'

import logger from '../logger'

import {
  CorruptDataError,
  UnableToConnectError,
  RequestTimeoutError
} from './errors'

const log = logger.create('fetch')

const DEFAULT_TIMEOUT_MS = 10000 /* 10 seconds */

const logRequestDuration = startTime => {
  log.debug(`Request took: ${Date.now() - startTime}ms`)
}

export const loadJSON = async (
  url,
  method = 'GET',
  query = {},
  body = {},
  headers = {},
  timeoutMs = DEFAULT_TIMEOUT_MS
) => {
  log.debug(
    `${method.toUpperCase()} [${url}] headers=${JSON.stringify(headers)}`
  )

  const myHeaders = {
    ...headers,
    'Content-Type': 'application/json'
  }

  const req = {
    cache: 'no-cache',
    method,
    headers: myHeaders
  }

  if ('GET' !== method) {
    req.body = JSON.stringify(body)
  }

  const myUrl = `${url}?${stringify(query)}`

  log.debug(`${method.toUpperCase()}`, myUrl, req)

  const startTime = Date.now()

  let res

  try {
    res = await new Promise((resolve, reject) => {
      const timeoutTimer = setTimeout(() => {
        reject(new RequestTimeoutError('Fetch timed out'))
      }, timeoutMs)

      fetch(myUrl, req).then((...result) => {
        clearTimeout(timeoutTimer)
        resolve(...result)
      }, reject)
    })
  } catch (err) {
    // basic error parsing
    let err2 = err
    const errStr = err.toString().toLowerCase()
    if (
      errStr.includes('failed to fetch') ||
      errStr.includes('network request failed')
    ) {
      err2 = new UnableToConnectError('Fetch failed')
    }

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
