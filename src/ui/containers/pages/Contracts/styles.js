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
  form: {
    marginTop: 30,
    alignItems: 'flex-start',
    width: '100%'
  },
  field: {
    ...fieldRow
  },
  textInput: {
    width: '100%'
  },
  picker: {
  },
  pickerButton: {
    width: 500
  },
  /* method */
  actionBlockContainer: {
    marginTop: 25,
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '$contracts_actionBlock_borderColor',
    borderStyle: 'dashed',
    backgroundColor: '$contracts_actionBlock_backgroundColor'
  },
  methodParams: {
    marginLeft: 20
  },
  cannotCallMethodDueToParamsText: {
    ...text
  }
})
