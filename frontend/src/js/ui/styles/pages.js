import { StyleSheet } from 'aphrodisiac';
import { COLORS, FONTS } from './vars';


export default StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    fontFamily: FONTS.body,
  },
  init: {
    backgroundColor: COLORS.c1,
    color: COLORS.white,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    justifyContent: 'center',
    alignItems: 'center',
    '& h2': {
      fontSize: '200%',
      margin: '0.5em',
    },
    '& p': {
      fontStyle: 'italic',
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    '& > div': {
      width: '30%'
    },
  },
});
