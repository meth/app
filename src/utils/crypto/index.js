import Base64 from 'base-64'
import sjcl from '@meth/sjcl'

import getRandomBytes from './random'

export const sha256 = data => sjcl.codec.hex.fromBits(
  sjcl.hash.sha256.hash(JSON.stringify(data))
)

export const sha512 = data => sjcl.codec.hex.fromBits(
  sjcl.hash.sha512.hash(JSON.stringify(data))
)

export const encrypt = async (key, data) => {
  const password = sjcl.codec.hex.toBits(key)
  const plaintext = JSON.stringify(data)
  const iv = await getRandomBytes(16, true)

  return Base64.encode(sjcl.encrypt(password, plaintext, {
    cipher: 'aes',
    iter: 1000,
    mode: 'gcm',
    iv,
    ts: 128,
    ks: 256
  }))
}

export const decrypt = async (key, ciphertext) => {
  const password = sjcl.codec.hex.toBits(key)

  const data = sjcl.decrypt(password, Base64.decode(ciphertext))

  return JSON.parse(data)
}
