import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  scrollViewContent: {
    alignItems: 'center'
  },
  txConfirmation: {
    alignItems: 'stretch',
    width: '90%'
  },
  txConfirmationIntroText: {
    ...text,
    ...fontMaker({ weight: 'SemiBold' }),
    color: '$content_textColor',
    fontSize: '1.5rem',
    marginBottom: 20,
    textAlign: 'center'
  },
  txConfirmationId: {
    flex: 0,
    justifyContent: 'center',
    marginBottom: 20
  },
  txConfirmationIdText: {
    fontSize: '0.7rem',
    color: '$modal_sendTransaction_txId_textColor'
  },
  txConfirmationReceipt: {
    justifyContent: 'center'
  },
  trackTransactionButton: {
    alignSelf: 'center',
    marginTop: 30
  }
})
