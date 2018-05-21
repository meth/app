import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  maxWidth: '100%',
  textAlign: 'left',
  fontSize: '0.7rem',
  color: '$transactionBlock_block_textColor'
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
  blockNumBlock: {
    ...flexRow,
    flex: 0,
    marginLeft: 5
  },
  receiptBlock: {
    ...flexRow,
    flex: 1,
    marginLeft: 20
  },
  blockNumText: {
    ...text
  },
  addressPrefixText: {
    ...text,
    marginRight: 5
  },
  addressTextContainer: {
    flex: 1
  },
  addressText: {
    ...text
  },
  receiptLinkButton: {
    marginLeft: 5
  },
  receiptLinkButtonText: {
    fontSize: '0.7rem'
  }
})
