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
    marginBottom: 10
  },
  rawTransactionBlockText: {
    fontSize: '0.8rem',
    textAlign: 'left'
  },
  showEthWarning: {
    marginVertical: 20
  },
  confirmButton: {
    alignSelf: 'center',
    marginTop: 20
  },
  /* error box */
  errorBox: {
    marginTop: 20,
    alignSelf: 'center'
  }
})
