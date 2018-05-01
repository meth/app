import { TEXT } from './fieldTypes'

export default class String {
  fieldType = () => TEXT
  isValid = str => !!str
  sanitize = str => (str || '').trim()
}
