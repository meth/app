import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,

  content: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40
  },

  /* text */

  text: {
    ...text,
    ...fontMaker({ weight: 'SemiBold' }),
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: 20,
    maxWidth: '90%'
  }
})
