import { create } from '../../../../styles'

const fieldRow = {
  marginBottom: 15,
  width: '90%'
}


export default create({
  form: {
    alignItems: 'center',
    width: '100%'
  },
  field: {
    ...fieldRow
  },
  textInput: {
    width: '100%'
  },
  formButton: {
    marginTop: 20
  },
  /* error box */
  errorBox: {
    marginTop: 20,
    alignSelf: 'center'
  }
})
