import { create, fontMaker, whenWidthSmall } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,

  content: {
    width: 500,
    height: 'auto'
  },

  /* qr code */

  qrCode: {
    width: '40%',
    height: 'auto'
  },

  /* responsive layout */

  ...whenWidthSmall({
    content: {
      width: '90%'
    }
  })
})
