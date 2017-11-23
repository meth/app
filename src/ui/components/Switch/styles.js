import { create, value, fontMaker } from '../../styles'

const text = {
  ...fontMaker()
}

export default ({ turnedOn }) => {
  const state = turnedOn ? 'on' : 'off'

  return {
    thumbColor: value(`$form_switch_${state}_thumbColor`),
    trackColor: value(`$form_switch_${state}_trackColor`),
    styles: create({
      container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      switch: {
        flex: 0,
        marginRight: 5
      },
      labelText: {
        ...text,
        marginLeft: 5,
        fontSize: '1rem',
        color: `$form_switch_${state}_label_textColor`
      }
    })
  }
}
