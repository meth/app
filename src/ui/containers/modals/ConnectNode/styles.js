import { create, fontMaker, whenWidthVerySmall } from '../../../styles'

const text = {
  ...fontMaker({ weight: 'Light' }),
  color: '$modal_content_textColor'
}

export default create({
  content: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 400,
    height: 'auto'
  },
  form: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  formWrapper: {
    marginBottom: 10
  },
  pickerButton: {
    width: 300
  },
  button: {
    marginTop: 25,
    width: 200
  },
  title: {
    ...text,
    fontSize: '1.2rem',
    marginBottom: 30
  },

  /* when conneted */

  networkText: {
    ...text,
    fontSize: '1.4rem'
  },
  typeText: {
    ...text,
    marginTop: 10,
    fontSize: '0.7rem',
    textTransform: 'lowercase'
  },
  chainIdText: {
    ...text,
    fontSize: '0.7rem',
    marginTop: 10,
    color: '$modal_connectNode_darkTextColor',
    textTransform: 'lowercase'
  },
  block: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockText: {
    ...text,
    fontSize: '0.7rem',
    color: '$modal_connectNode_darkTextColor',
    textTransform: 'lowercase'
  },
  blockLinkButton: {
    marginLeft: 5
  },
  blockLinkButtonText: {
    fontSize: '0.6rem'
  },
  syncingText: {
    ...text,
    fontSize: '0.7rem',
    marginTop: 10,
    color: '$modal_connectNode_darkTextColor',
    textTransform: 'lowercase'
  },

  /* error display */

  errorBox: {
    marginTop: 20
  },

  /* picker stuff */

  pickerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickerOptionLabelText: {
    ...fontMaker(),
    color: '$form_picker_textColor',
    fontSize: '1rem'
  },
  pickerOptionCategoryText: {
    ...fontMaker(),
    color: '$form_picker_category_textColor',
    fontSize: '0.8rem'
  },

  /* responsive layouyt */

  ...whenWidthVerySmall({
    content: {
      width: '90%'
    }
  })
})
