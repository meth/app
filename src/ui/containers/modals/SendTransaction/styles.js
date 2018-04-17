import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker()
}

const fieldRow = {
  marginBottom: 15,
  width: '90%'
}

const multiFieldRow = {
  ...fieldRow,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'stretch'
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
  /* to */
  toRow: {
    ...multiFieldRow
  },
  toField: {
    flex: 1
  },
  toPicker: {
    flex: 0,
    marginLeft: 5
  },
  toPickerButtonIcon: {
    fontSize: '0.8rem'
  },
  /* amount */
  amountRow: {
    ...multiFieldRow
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
