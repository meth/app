import { create } from '../../../styles'

const flexRow = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

export default create({
  container: {
    ...flexRow,
    paddingHorizontal: 10
  },
  typeIcon: {
    flex: 0,
    color: '$transactionBlock_icon_textColor',
    fontSize: '1.5rem',
    marginRight: 15,
    width: 30
  },
  txParams: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  txFromTo: {
  },
  txDetails: {
    marginTop: 10
  },
  txReceipt: {
    ...flexRow,
    marginTop: 10
  }
})
