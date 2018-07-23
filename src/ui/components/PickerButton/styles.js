import { create, fontMaker } from '../../styles'
import { isAndroid } from '../../../utils/deviceInfo'

const text = {
  ...fontMaker(),
  color: '$button_picker_enabled_default_textColor'
}

export default create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  labelContainer: {
    maxWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    ...text,
    fontSize: '1rem',
    ...(isAndroid() ? { paddingVertical: 5 } : null)
  },
  iconText: {
    ...text,
    fontSize: '1.2rem',
    marginTop: -2
  }
})
