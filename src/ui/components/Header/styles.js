import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  color: '$header_textColor',
  fontSize: '0.8rem'
}

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
  appNameText: {
    ...text,
    paddingLeft: 10
  },
  section: {
    paddingHorizontal: 10
  },
  button: {
    ...button
  },
  logout: {
    borderLeftWidth: 1,
    borderLeftColor: '$header_dividerColor'
  },
  network: {
    borderRightWidth: 1,
    borderRightColor: '$header_dividerColor',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  networkButton: {
    ...button,
    paddingHorizontal: 10
  },
  networkButtonText: {
    ...text
  },
  networkButtonLoading: {
    marginLeft: 5
  },
  balance: {
    borderRightWidth: 1,
    borderRightColor: '$header_dividerColor'
  }
})
