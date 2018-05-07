import sjcl from 'sjcl'

const getRandomBytes = numBytes => {
  // TODO: use a proper entropy-based RNG
  const ret = []

  for (let i = 0; numBytes / 4 > i; i += 1) {
    ret.push(Math.random() * 2147483647 /* 2**31-1 */)
  }

  return ret
}

export const sha256 = data => sjcl.hash.sha256.hash(JSON.stringify(data))

export const sha512 = data => sjcl.hash.sha512.hash(JSON.stringify(data))

export const encrypt = (key, data) => {
  const password = sjcl.codec.hex.toBits(key)
  const plaintext = JSON.stringify(data)
  const iv = getRandomBytes(16)

  sjcl.codec.base64url.fromBits(sjcl.encrypt(password, plaintext, {
    cipher: 'aes',
    iter: 1000,
    mode: 'gcm',
    iv,
    ts: 128,
    ks: 256
  }))
}

export const decrypt = (key, ciphertext) => {
  const password = sjcl.codec.hex.toBits(key)

  const data = sjcl.decrypt(password, sjcl.codec.base64url.toBits(ciphertext))

  return JSON.parse(data)
}
