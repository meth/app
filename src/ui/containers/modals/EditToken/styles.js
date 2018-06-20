import { create, fontMaker, perWidth } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,

  content: {
    width: perWidth('100%', '90%'),
    height: 'auto'
  },

  /* texts */

  titleText: {
    marginBottom: 20
  },
  meta: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  metaIcon: {
    marginHorizontal: 10
  },
  metaIconText: {
    ...text,
    color: '$modal_editAddress_metaTextColor',
    fontSize: '0.7rem'
  },

  /* form */

  formWrapper: {
    marginTop: 10,
    width: '80%'
  },
  field: {
    marginBottom: 15
  },
  errorBox: {
    marginTop: 20
  },

  /* buttons */

  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 5
  }
})
