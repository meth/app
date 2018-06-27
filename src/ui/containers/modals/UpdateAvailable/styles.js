import { create, perWidth, fontMaker } from '../../../styles'

export default create({
  // $outline: 1,

  content: {
    width: perWidth(400, '90%'),
    height: 'auto'
  },
  scrollContainerContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  text: {
    ...fontMaker({ weight: 'SemiBold' }),
    color: '$modal_content_textColor',
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: 30
  }
})
