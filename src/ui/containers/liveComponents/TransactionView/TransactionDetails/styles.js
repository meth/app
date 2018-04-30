import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  maxWidth: '100%',
  textAlign: 'left'
}

const flexRow = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

export default create({
  container: {
    ...flexRow
  },
  typeText: {
    ...text,
    ...fontMaker({ weight: 'SemiBold' }),
    color: '$transactionBlock_type_textColor',
    fontSize: '0.7rem',
    textTransform: 'uppercase'
  },
  detailsContent: {
    marginLeft: 20
  },
  detailsText: {
    color: '$transactionBlock_details_textColor',
    marginRight: 5
  },
  tokenTransferDetails: {
    ...flexRow
  }
})
