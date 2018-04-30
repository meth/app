import { create } from '../../../styles'

const flexRow = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

export default create({
  container: {
    ...flexRow
  },
  typeIcon: {
    color: '$transactionBlock_icon_textColor',
    fontSize: '1.5rem',
    marginRight: 15,
    width: 25
  },
  txParams: {
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  txFromTo: {
    marginLeft: 10
  },
  txDetails: {
    marginTop: 10
  },
  txReceipt: {
    ...flexRow,
    marginTop: 10
  }
})
