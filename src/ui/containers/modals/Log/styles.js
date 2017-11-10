import { create, fontMaker } from '../../../styles'

export default create({
  overlay: {
    backgroundColor: '$modal_log_overlay_backgroundColor'
  },
  scrollContainer: {
    flex: 0,
    padding: 20,
    backgroundColor: '$modal_content_backgroundColor',
    borderRadius: 10,
    width: '90%',
    height: '90%'
  },
  scrollContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    ...fontMaker(),
    fontSize: '1.5rem',
    textAlign: 'center',
    color: `$modal_content_textColor`
  }
})
