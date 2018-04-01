import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  textAlign: 'center'
}

export default create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  addressLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '90%'
  },
  addressText: {
    ...text,
    fontSize: '0.8rem',
    maxWidth: '90%'
  },
  labelText: {
    ...text,
    fontSize: '0.6rem',
    maxWidth: '90%'
  }
})
