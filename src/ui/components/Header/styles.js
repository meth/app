import { create, fontMaker } from '../../styles'

const button = {
  paddingVertical: 10,
  borderRadius: 0
}

export default create({
  container: {
    backgroundColor: '$header_backgroundColor',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
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
  section: {
    paddingHorizontal: 10
  },
  button: {
    ...button
  },
  buttonIcon: {
    fontSize: '0.9rem'
  },
  networkButton: {
    ...button,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  networkButtonText: {
    ...fontMaker(),
    fontSize: '0.7rem'
  },
  networkButtonLoadingSpinner: {
    marginLeft: 5
  }
})
