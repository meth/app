import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,

  content: {
    width: 400,
    height: 'auto'
  },

  /* dapp title */

  dappTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  dappTitlePrefixText: {
    ...text,
    textTransform: 'uppercase',
    fontSize: '1.3rem',
    marginRight: 10
  },
  dappTitleIdText: {
    ...text,
    fontSize: '1.3rem'
  },

  /* form */

  form: {
    width: '100%'
  },

  section: {
    position: 'relative',
    marginBottom: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  sectionLayout: {
    width: '90%',
    borderWidth: 1,
    borderColor: '$form_section_layout_borderColor',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  sectionTitleText: {
    ...text,
    textAlign: 'center',
    color: '$form_section_title_textColor',
    backgroundColor: '$modal_content_backgroundColor',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: -13,
    zIndex: 1
  }
})
