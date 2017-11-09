import { create, fontMaker } from '../../../styles'

export default create({
  overlay: {
    backgroundColor: '$modal_log_overlay_backgroundColor'
  },
  container: {
    flex: 0,
    padding: 20,
    backgroundColor: '$modal_content_backgroundColor',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '90%'
  },
  text: {
    ...fontMaker(),
    fontSize: '1.5rem',
    textAlign: 'center',
    color: `$modal_content_textColor`
  }
})
