import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker()
}

export default ({ turnedOn }) => {
  const state = turnedOn ? 'on' : 'off'

  return create({
    container: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    labelText: {
      ...text,
      marginLeft: 5,
      fontSize: '1rem',
      color: `$form_checkbox_${state}_label_textColor`
    },
    box: {
      width: 32,
      height: 32,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: `$form_checkbox_${state}_box_borderColor`,
      backgroundColor: `$form_checkbox_${state}_box_backgroundColor`
    },
    tickIcon: {
      ...text,
      color: `$form_checkbox_${state}_box_tickIcon_color`,
      opacity: `$form_checkbox_${state}_box_tickIcon_opacity`,
      textAlign: 'center'
    }
  })
}
