import { create, fontMaker, whenWidthSmall } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,

  content: {
    width: 600,
    height: 'auto',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40
  },

  /* address text */

  address: {
    marginBottom: 30,
    maxWidth: '90%'
  },
  addressText: {
    ...text,
    ...fontMaker({ weight: 'SemiBold' }),
    textAlign: 'center',
    fontSize: '1rem'
  },

  /* responsive layout */

  ...whenWidthSmall({
    content: {
      width: '90%'
    }
  })
})
