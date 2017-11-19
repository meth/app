import { createHash } from 'crypto'

export const sha256 = str => createHash('sha256').update(str).digest('hex')
