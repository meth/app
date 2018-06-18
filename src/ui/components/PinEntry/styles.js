import { create, fontMaker } from '../../styles'

export default create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  entryPad: {
    backgroundColor: '$pin_entryPad_backgroundColor',
    borderRadius: 15,
    padding: 5
  },
  pin: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinNumber: {
    ...fontMaker({ weight: 'Bold' }),
    fontSize: '1.5rem',
    color: '$pin_hiddenChar_textColor',
    textAlign: 'center',
    marginHorizontal: 10
  },
  clearButton: {
    marginTop: -6,
    marginLeft: 20,
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  clearButtonIconText: {
    fontSize: '0.8rem'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  numberButton: {
    margin: 10,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberButtonText: {
    ...fontMaker({ weight: 'SemiBold' }),
    fontSize: '1rem'
  }
})
