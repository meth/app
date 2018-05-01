import { BOOLEAN } from './fieldTypes'

export default class Bool {
  fieldType = () => BOOLEAN
  isValid = () => true
  sanitize = val => val
}
