import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  textAlign: 'left'
}

const flexRow = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

export default create({
  container: {
    ...flexRow,
    flexWrap: 'wrap'
  },
  text: {
    ...text,
    fontSize: '0.6rem',
    marginRight: 5,
    color: '$transactionBlock_fromTo_textColor'
  }
})
