import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  textAlign: 'left'
}

export default create({
  text: {
    ...text,
    color: '$balance_amount_textColor',
    fontSize: '1rem',
    lineHeight: '1.6rem'
  }
})
