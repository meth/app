import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  textAlign: 'left'
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
  /* table */
  table: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20,
    width: '100%'
  },
  /* tx row */
  tx: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  typeIcon: {
    color: '$transactionBlock_icon_textColor',
    fontSize: '1.5rem',
    marginRight: 15
  },
  txParams: {
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  txFromTo: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  id: {
    flexDirection: 'row'
  },
  idText: {
    ...text,
    color: '$transactionBlock_id_textColor',
    fontSize: '0.9rem'
  },
  idLinkButton: {
    marginLeft: 5
  },
  idLinkButtonText: {
    fontSize: '0.9rem'
  },
  fromToText: {
    ...text,
    fontSize: '0.6rem',
    marginRight: 5,
    color: '$transactionBlock_fromTo_textColor'
  },
  txDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  typeText: {
    ...text,
    ...fontMaker({ weight: 'SemiBold' }),
    color: '$transactionBlock_type_textColor',
    fontSize: '0.7rem',
    textTransform: 'uppercase'
  },
  detailsContent: {
    marginLeft: 20
  },
  detailsText: {
    color: '$transactionBlock_details_textColor',
    marginRight: 5
  },
  tokenTransferDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
