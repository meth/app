import { create, fontMaker, whenWidthSmall } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  // $outline: 1,

  content: {
    width: 500,
    height: 'auto'
  },

  /* texts */

  titleText: {
    marginBottom: 20
  },
  addressText: {
    ...text,
    fontSize: '0.8rem'
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
    width: '70%'
  },
  field: {},
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
  },

  /* responsive layout */

  ...whenWidthSmall({
    content: {
      width: '90%'
    }
  })
})
