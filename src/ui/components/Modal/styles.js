import { create, coverParent } from '../../styles'

export default create({
  popupWrapper: {
    ...coverParent
  },
  fadeWrapper: {
    ...coverParent
  },
  overlay: {
    ...coverParent,
    backgroundColor: '$modal_overlay_backgroundColor',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: '$modal_content_backgroundColor',
    width: '90%',
    height: '90%',
    flex: 0,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    borderRadius: 40
  }
})
