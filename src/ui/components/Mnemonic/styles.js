import { create, fontMaker, coverParent } from '../../styles'

const maskText = {
  ...fontMaker(),
  color: '$button_mask_enabled_default_textColor',
  textAlign: 'center'
}

export default create({
  mnemonicWords: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wordText: {
    ...fontMaker(),
    fontSize: '1rem',
    textAlign: 'center',
    color: '$mnemonic_textColor',
    backgroundColor: '$mnemonic_backgroundColor',
    borderRadius: 5,
    padding: 5,
    margin: 5
  },
  confirmedMnemonicWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '$mnemonic_confirmationBox_backgroundColor',
    minHeight: 40,
    borderRadius: 5,
    marginTop: 10,
    padding: 10
  },
  confirmedWordText: {
    ...fontMaker(),
    textAlign: 'center',
    color: '$mnemonic_confirmationBox_textColor',
    margin: 5
  },
  unselectedWordText: {
    opacity: 0.4
  },
  wordWrapperButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0
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
