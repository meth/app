import { create, fontMaker } from '../../../styles'

export default create({
  container: {
    flex: 0,
    padding: 20,
    backgroundColor: '$modal_content_backgroundColor',
    width: 400,
    height: 320,
    borderRadius: 10,
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    ...fontMaker({ weight: 'Bold' }),
    color: '$modal_content_textColor',
    fontSize: '0.6rem'
  }
})
