import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

const fieldRow = {
  marginBottom: 15,
  width: '100%'
}

export default create({
  layoutContent: {
    flex: 0,
    padding: 10,
    backgroundColor: '$content_backgroundColor',
    borderTopWidth: 1,
    borderTopColor: '$content_borderTop_color',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  topLevelLoading: {
    flex: 1
  },
  container: {
    paddingBottom: 20,
    alignItems: 'flex-start',
    width: '100%'
  },
  formWrapper: {
    width: '100%',
    alignItems: 'flex-start'
  },
  field: {
    ...fieldRow
  },
  textInput: {
    width: '100%'
  },
  switchLabelText: {
    ...text,
    fontSize: '0.8rem'
  },
  picker: {
  },
  pickerButton: {
    width: '100%'
  },
  submitButton: {
    marginTop: 20
  },
  /* method */
  methodContainer: {
    width: '100%'
  },
  paramsContainer: {
  },
  paramsForm: {
    padding: 20,
    borderWidth: 1,
    borderColor: '$contracts_params_borderColor',
    borderStyle: 'dashed',
    backgroundColor: '$contracts_params_backgroundColor'
  },
  /* outputs */
  results: {
    marginTop: 20
  },
  resultValue: {
    minWidth: '50%'
  },
  resultValueText: {
    ...text,
    textAlign: 'left'
  },
  /* error */
  errorBox: {
    marginTop: 15
  }
})
