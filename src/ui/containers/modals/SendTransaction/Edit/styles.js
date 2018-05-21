import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
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
  setMaxAmountButton: {
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  setMaxAmountButtonText: {
    fontSize: '0.6rem',
    marginRight: 5
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
    marginBottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  maxCostText: {
    ...text,
    textAlign: 'left'
  },
  /* error box */
  errorBox: {
    marginTop: 20,
    alignSelf: 'center'
  }
})
