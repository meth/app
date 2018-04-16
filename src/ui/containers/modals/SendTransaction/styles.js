import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker()
}

export default create({
  content: {
    width: 550,
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleText: {
    marginBottom: 35
  },

  /* form */

  form: {
    alignItems: 'center',
    width: '100%'
  },
  field: {
    marginBottom: 15,
    width: '90%'
  },
  switchLabelText: {
    ...text,
    fontSize: '0.8rem'
  },
  textInput: {
    width: '100%'
  },
  formButton: {
    marginTop: 20
  },

  /* error box */

  errorBox: {
    marginTop: 20
  }
})
