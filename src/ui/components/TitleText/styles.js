import { create, fontMaker } from '../../styles'

export default create({
  text: {
    ...fontMaker({ weight: 'Light' }),
    fontSize: '0.8rem',
    color: '$content_title_textColor'
  }
})
