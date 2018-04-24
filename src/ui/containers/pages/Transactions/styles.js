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
    paddingHorizontal: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  txInfo: {
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  txFromTo: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  txMeta: {
    justifyContent: 'center',
    alignItems: 'flex-end'
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
  }
})
