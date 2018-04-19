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
  /* gas */
  gasRow: {
    ...multiFieldRow
  },
  gasLimitField: {
    flex: 0,
    width: 150,
    marginRight: 5
  },
  gasPriceField: {
    flex: 1
  },
  /* total cost */
  totalCost: {
    ...fieldRow,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  totalCostText: {
    ...text,
    color: '$modal_content_textColor',
    textAlign: 'left'
  },

  /* raw tx */
  rawTransaction: {
    alignItems: 'stretch',
    width: '90%'
  },
  rawTransactionBlock: {
    height: 50,
    borderRadius: 5,
    marginBottom: 20
  },
  rawTransactionBlockText: {
    fontSize: '0.8rem',
    textAlign: 'left'
  },
  rawTransactionButton: {
    alignSelf: 'center'
  },

  /* receipt */
  receipt: {
    alignItems: 'center'
  },
  receiptIntroText: {
    ...text,
    ...fontMaker({ weight: 'SemiBold' }),
    color: '$content_textColor',
    fontSize: '1.5rem',
    marginBottom: 15,
    textAlign: 'center'
  },
  receiptBlock: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginBottom: 30
  },

  /* error box */

  errorBox: {
    marginTop: 20
  }
})
