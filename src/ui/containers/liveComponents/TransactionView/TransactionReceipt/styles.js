import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  maxWidth: '100%',
  textAlign: 'left'
}

const flexRow = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

export default create({
  container: {
    ...flexRow
  },
  statusAcceptedIcon: {
    color: '$transactionBlock_status_accepted_textColor',
    fontSize: '0.9rem'
  },
  statusRejectedIcon: {
    color: '$transactionBlock_status_rejected_textColor',
    fontSize: '0.9rem'
  },
  receiptBlock: {
    marginLeft: 20,
    ...flexRow
  },
  receiptText: {
    ...text,
    fontSize: '0.7rem',
    color: '$transactionBlock_block_textColor',
    textTransform: 'lowercase'
  },
  receiptLinkButton: {
    marginLeft: 5
  },
  receiptLinkButtonText: {
    fontSize: '0.7rem'
  }
})
