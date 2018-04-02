import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  textAlign: 'left'
}

export default create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  amountText: {
    ...text,
    color: '$balance_amount_textColor',
    fontSize: '1rem',
    lineHeight: '1.6rem'
  },
  unitText: {
    ...text,
    ...fontMaker({ weight: 'Light' }),
    textTransform: 'uppercase',
    color: '$balance_unit_textColor',
    fontSize: '0.6rem'
  }
})
