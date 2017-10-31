import { create, fontMaker } from '../../../styles'

const container = {
  flex: 0,
  padding: 20,
  backgroundColor: '$modal_content_backgroundColor',
  borderRadius: 10,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: 400
}

export default create({
  loadingContainer: {
    ...container,
    height: 120
  },
  contentContainer: {
    ...container,
    height: 250
  },
  container: {
  },
  title: {
    ...fontMaker({ weight: 'Light' }),
    color: '$modal_content_textColor',
    fontSize: '1.5rem',
    marginBottom: 30
  }
})
