import { create, fontMaker } from '../../styles'

export default create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
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
  number: {
    margin: 10,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '$pin_number_borderColor',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberText: {
    ...fontMaker({ weight: 'Light' }),
    color: '$pin_number_textColor'
  }
})
