import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1rem',
  color: '$modal_confirm_textColor'
}

export default create({
  // $outline: 1,
  overlay: {
    backgroundColor: '$modal_confirm_overlay_backgroundColor'
  },
  content: {
    padding: 30,
    backgroundColor: `$modal_confirm_backgroundColor`,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 'auto'
  },

  text: {
    ...text,
    textAlign: 'center',
    fontSize: '1rem'
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: '50%'
  },
  button: {
    marginHorizontal: 5
  }
})
