import { create, fontMaker } from '../../../styles'

export default create({
  layoutContent: {
    backgroundColor: '$startScreen_backgroundColor'
  },
  mnemonic: {
    ...fontMaker({ weight: 'bold' }),
    fontSize: '2rem',
    marginVertical: 30
  }
})
