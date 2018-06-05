import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1rem'
}

export default create({
  // $outline: 1,
  menuFadeWrapper: {
    flex: 1
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: '$modal_overlay_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  menuContainer: {
    backgroundColor: '$browser_mobileMenu_backgroundColor'
  },
  button: {
    paddingHorizontal: 3,
    paddingVertical: 4
  },
  buttonIcon: {
    fontSize: '1.6rem'
  },
  iconButton: {
    marginRight: 20
  },
  iconButtonText: {
    fontSize: '1.2rem',
    paddingVertical: 5
  },
  option: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '$browser_mobileMenu_option_borderColor',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  optionText: {
    ...text,
    textAlign: 'left',
    marginLeft: 10,
    color: '$browser_mobileMenu_option_textColor'
  }
})
