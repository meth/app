import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  scrollViewContent: {
    alignItems: 'center'
  },
  confirmText: {
    ...text,
    fontSize: '0.8rem',
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
  /* error box */
  errorBox: {
    marginTop: 20,
    alignSelf: 'center'
  }
})
