import { create, fontMaker } from '../../../styles'

export default create({
  content: {
    width: 400,
    height: 'auto'
  },
  title: {
    ...fontMaker({ weight: 'Bold' }),
    color: '$modal_content_textColor',
    fontSize: '0.6rem'
  }
})
