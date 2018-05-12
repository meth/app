import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

const fieldRow = {
  marginBottom: 15,
  width: '90%'
}

export default create({
  layoutContent: {
    // $outline: 1,
    backgroundColor: '$content_backgroundColor',
    borderTopWidth: 1,
    borderTopColor: '$content_borderTop_color',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 0,
    height: '95%'
  },
  container: {
    marginTop: 20,
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
    width: 500
  },
  submitButton: {
    marginTop: 20
  },
  /* method */
  methodContainer: {
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
  resultValueText: {
    ...text
  },
  /* error */
  errorBox: {
    marginTop: 15
  }
})
