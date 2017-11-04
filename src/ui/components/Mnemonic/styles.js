import { create, fontMaker, coverParent } from '../../styles'

const maskText = {
  ...fontMaker(),
  color: '$button_mask_enabled_default_textColor',
  textAlign: 'center'
}

export default create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    ...fontMaker(),
    fontSize: '1rem',
    textAlign: 'center',
    color: '$mnemonic_textColor',
    backgroundColor: '$mnemonic_backgroundColor',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    margin: 5
  },
  maskButton: {
    ...coverParent,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  maskButtonIcon: {
    ...maskText,
    fontSize: '2rem'
  },
  maskButtonText: {
    ...maskText,
    fontSize: '1rem'
  }
})
