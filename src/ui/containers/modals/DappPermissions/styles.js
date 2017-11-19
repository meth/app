import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
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
  }
})
