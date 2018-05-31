import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  optionButton: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 0
  },
  optionLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  optionRight: {
    flex: 0,
    width: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  labelText: {
    flex: 1,
    ...text,
    fontSize: '0.9rem',
    color: '$modal_bookmarks_label_textColor'
  },
  urlText: {
    flex: 1,
    ...text,
    fontSize: '0.6rem',
    color: '$modal_bookmarks_url_textColor'
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 7
  }
})
