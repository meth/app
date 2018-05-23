import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1rem',
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,
  content: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto'
  },
  text: {
    ...text,
    textAlign: 'center',
    fontSize: '1rem'
  },
  pin: {
    marginTop: 20
  }
})
