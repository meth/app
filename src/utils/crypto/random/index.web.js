import getInsecureRandomBytes from './insecure'

export default numBytes => {
  if (!window.crypto.getRandomValues) {
    return getInsecureRandomBytes(numBytes)
  }

  const array = new Uint32Array(numBytes / 4)

  window.crypto.getRandomValues(array)

  return Array.from(array)
}
