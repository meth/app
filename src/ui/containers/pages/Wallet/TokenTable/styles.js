import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  color: '$content_textColor',
  fontSize: '1rem'
}

export default create({
  // $outline: 1,

  table: {
    flex: 1,
    width: '100%'
  },
  tableFilterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  tableFilterInput: {
    flex: 1,
    fontSize: '0.7rem',
    paddingVertical: 7
  },
  tableFilterButton: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 5
  },
  tableAddButton: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 5
  },
  noneText: {
    ...text,
    ...fontMaker({ style: 'Italic' }),
    color: '$wallet_tokens_tableMessage_textColor',
    fontSize: '0.8rem',
    marginTop: 5
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  tokenRowLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tokenSymbolText: {
    ...text,
    fontSize: '0.8rem',
    color: '$wallet_tokens_symbol_textColor'
  },
  tokenNameText: {
    ...text,
    fontSize: '0.65rem',
    color: '$wallet_tokens_name_textColor',
    marginLeft: 5
  },
  tokenRowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  tokenBalanceText: {
    ...text,
    fontSize: '0.8rem',
    color: '$wallet_tokens_balance_textColor',
    marginRight: 5
  },
  tokenCheckButton: {
    borderWidth: 0
  },
  tokenErrorBox: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    marginRight: 5
  },
  editTokenButton: {
    borderWidth: 0,
    marginLeft: 5
  }
})
