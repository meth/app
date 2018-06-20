import { create, perWidth, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,

  content: {
    width: perWidth(500, '90%'),
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
    maxWidth: '80%'
  },
  addressText: {
    ...text,
    ...fontMaker({ weight: 'SemiBold' }),
    textAlign: 'center',
    fontSize: '1rem'
  }

})
