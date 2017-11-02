import { create, fontMaker } from '../../styles'

const textStyles = {
  ...fontMaker(),
  color: '$header_textColor',
  fontSize: '0.8rem'
}

export default create({
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  appNameText: {
    ...textStyles
  }
})
