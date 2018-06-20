import { create, fontMaker, coverParent, perWidth } from '../../styles'

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
  mnemonicDisplay: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wordText: {
    ...fontMaker({ weight: 'SemiBold' }),
    fontSize: perWidth('1rem', '0.85rem'),
    textAlign: 'center',
    color: '$mnemonic_textColor',
    backgroundColor: '$mnemonic_backgroundColor',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    marginLeft: 0
  },
  confirmedMnemonicWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '$mnemonic_confirmationBox_topBorderColor',
    minHeight: 40,
    borderRadius: 5,
    marginTop: 10,
    padding: 10
  },
  selectedWordText: {
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
    ...fontMaker({ weight: 'SemiBold' }),
    fontSize: '1.2rem'
  },
  wordColumns: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  wordColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 10
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  wordIndexText: {
    ...fontMaker({ weight: 'SemiBold' }),
    fontSize: perWidth('1rem', '0.8rem'),
    textAlign: 'center',
    color: '$mnemonic_textColor',
    width: '2rem'
  }
})
