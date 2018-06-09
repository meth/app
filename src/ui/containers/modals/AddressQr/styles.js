import { create, perWidth, fontMaker, whenWidthSmall } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,

  content: {
    width: perWidth(600, '90%'),
    height: 'auto'
  },
  scrollContainerContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: perWidth(40, 20)
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
