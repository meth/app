import { create, perWidth, fontMaker } from '../../../styles'

export default create({
  layoutContent: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    maxWidth: perWidth(700, '100%'),
    padding: 10
  },
  body: {
    backgroundColor: '$content_backgroundColor',
    padding: 10
  },
  formWrapper: {
    flex: 1
  },
  field: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  labelText: {
    ...fontMaker(),
    fontSize: '1rem',
    color: '$splashContent_textColor',
    width: '4rem'
  },
  textInput: {
    flex: 1,
    marginRight: 10
  }
})
