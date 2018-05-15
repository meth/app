import getInsecureRandomBytes from './insecure'

export default async (numBytes, as32bitWords = false) => {
  if (!window.crypto.getRandomValues) {
    return getInsecureRandomBytes(numBytes)
  }

  const array = as32bitWords
    ? new Uint32Array(numBytes / 4)
    : new Uint8Array(numBytes)

  window.crypto.getRandomValues(array)

  return Array.from(array)
}
