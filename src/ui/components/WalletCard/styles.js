import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  textAlign: 'center'
}

export default create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },

  /* address and label */

  addressLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  addressText: {
    ...text,
    fontSize: '0.8rem',
    maxWidth: '90%',
    color: '$wallet_card_account_address_textColor'
  },
  labelText: {
    ...text,
    fontSize: '0.6rem',
    maxWidth: '90%',
    color: '$wallet_card_account_label_textColor'
  },

  /* balance */

  balance: {
    width: '90%',
    flexDirection: 'column'
  },
  amountText: {
    textAlign: 'center',
    fontSize: '1.7rem',
    maxWidth: '90%'
  },
  unitText: {
    textAlign: 'center',
    fontSize: '0.8rem',
    maxWidth: '90%'
  }
})
