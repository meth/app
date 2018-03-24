import { create, fontMaker } from '../../../styles'

export default create({
  layoutContent: {
    backgroundColor: '$startScreen_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    ...fontMaker(),
    fontSize: '1rem',
    textAlign: 'center',
    color: '$startScreen_textColor',
    maxWidth: '70%'
  }
})
