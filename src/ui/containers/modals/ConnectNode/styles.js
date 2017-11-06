import { create, fontMaker } from '../../../styles'

export default create({
  container: {
    flex: 0,
    padding: 30,
    backgroundColor: '$modal_content_backgroundColor',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 400
  },
  picker: {
    marginBottom: 20
  },
  pickerButton: {
    width: 300
  },
  button: {
    marginTop: 25,
    width: 200
  },
  title: {
    ...fontMaker({ weight: 'Light' }),
    color: '$modal_content_textColor',
    fontSize: '1.2rem',
    marginBottom: 30
  },
  errorBox: {
    marginTop: 30
  }
})
