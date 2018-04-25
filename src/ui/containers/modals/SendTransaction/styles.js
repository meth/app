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
  /* max cost */
  maxCost: {
    ...fieldRow,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  maxCostText: {
    ...text,
    color: '$modal_content_textColor',
    textAlign: 'left'
  },

  /* pre-confirm step */
  confirmText: {
    ...text,
    fontSize: '0.8rem',
    color: '$modal_content_textColor',
    marginBottom: 10
  },
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

  /* tx id */
  txId: {
    alignItems: 'stretch',
    width: '90%'
  },
  txIdIntroText: {
    ...text,
    ...fontMaker({ weight: 'SemiBold' }),
    color: '$content_textColor',
    fontSize: '1.5rem',
    marginBottom: 15,
    textAlign: 'center'
  },
  txIdBlock: {
    height: 50,
    borderRadius: 5,
    marginBottom: 30
  },
  txIdBlockText: {
    fontSize: '0.8rem'
  },
  trackTransactionButton: {
    alignSelf: 'center'
  },

  /* error box */

  errorBox: {
    marginTop: 20
  }
})
