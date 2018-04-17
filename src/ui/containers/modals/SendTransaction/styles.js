import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker()
}

const fieldRow = {
  marginBottom: 15,
  width: '90%'
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
    ...fieldRow
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
  amountRow: {
    ...fieldRow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  amountField: {
    flex: 1
  },
  unitField: {
    flex: 0,
    width: 100,
    marginLeft: 5
  },
  unitPickerButton: {
    paddingVertical: 8
  },
  unitPickerButtonText: {
    fontSize: '0.8rem'
  },

  /* error box */

  errorBox: {
    marginTop: 20
  }
})
