import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Form from 'react-native-advanced-forms'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import ErrorBox from '../../../components/ErrorBox'
import TextInput from '../../../components/TextInput'
import ProgressButton from '../../../components/ProgressButton'
import FormWrapper from '../../../components/FormWrapper'
import Button from '../../../components/Button'
import TitleText from '../../../components/TitleText'
import CopyableText from '../../../components/CopyableText'
import AskUserConfirmModal from '../../../components/AskUserConfirmModal'
import styles from './styles'
import formStyles from '../../../styles/forms'

@connectStore('account')
export default class EditBookmark extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      url: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  }

  constructor (props, ctx) {
    super(props, ctx)

    const { data: { url: editUrl, label: editLabel } } = this.props

    const { getBookmarks } = this.props.selectors

    const bookmarks = getBookmarks()

    const found = bookmarks.find(({ url }) => url === editUrl)

    this.state = {
      alreadyExists: !!found,
      label: _.get(found, 'label', editLabel || ''),
      submitting: false,
      error: null
    }
  }

  render () {
    const { data: { url } } = this.props

    const { error, label, submitting, alreadyExists } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <TitleText
          style={styles.titleText}
          text={t(alreadyExists ? 'title.editBookmark' : 'title.addBookmark')}
        />
        <View style={styles.addressBlock}>
          <CopyableText
            style={styles.address}
            textStyle={styles.addressText}
            text={url}
          />
        </View>
        <FormWrapper style={styles.formWrapper}>
          <Form
            ref={this._onFormRef}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            validate={this.validate}
          >
            <Form.Field
              name='label'
              label={t('modal.editBookmark.labelFieldLabel')}
              style={styles.field}
              labelStyle={formStyles.label}
              labelTextStyle={formStyles.labelText}
            >
              <TextInput
                value={label}
                style={styles.labelInput}
                placeholder={t('modal.editBookmark.labelInputPlaceholder')}
              />
            </Form.Field>
          </Form>
        </FormWrapper>
        <View style={styles.buttons}>
          <ProgressButton
            disabled={!(this.form && this.form.canSubmit())}
            style={styles.button}
            showInProgress={submitting}
            onPress={this.submit}
            title={t('button.save')}
          />
          {alreadyExists ? (
            <Button
              style={styles.button}
              onPress={this.delete}
              title={t('button.delete')}
            />
          ) : null}
        </View>
        <ErrorBox style={styles.errorBox} error={error} />
        <AskUserConfirmModal
          ref={this._onConfirmModalRef}
          question={t('modal.editAddress.areYouSureYouWantToDelete')}
          yesButtonText={t('button.yes')}
          noButtonText={t('button.no')}
          onPressYes={this.onDelete}
        />
      </Modal>
    )
  }

  _onConfirmModalRef = d => {
    this.confirmDeleteModal = d
  }

  _onFormRef = f => {
    this.form = f
  }

  onChange = values => {
    this.setState({
      label: values.label,
      error: null
    })
  }

  onSubmit = () => {
    const { data: { url } } = this.props
    const { saveBookmark } = this.props.actions
    const { label } = this.state

    this.setState({
      submitting: true,
      error: null
    }, () => {
      saveBookmark(url, label)
        .then(() => this.close())
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  validate = values => {
    const ret = {}

    if (!_.get(values, 'label')) {
      ret.label = Form.VALIDATION_RESULT.MISSING
    }

    return ret
  }

  submit = () => {
    if (this.form) {
      this.form.validateAndSubmit()
    }
  }

  delete = () => {
    if (this.confirmDeleteModal) {
      this.confirmDeleteModal.show()
    }
  }

  onDelete = () => {
    const { data: { url } } = this.props
    const { deleteBookmark } = this.props.actions

    this.setState({
      submitting: false,
      error: null
    }, () => {
      deleteBookmark(url)
        .then(() => this.close())
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  close = () => {
    const { hideEditBookmarkModal } = this.props.actions

    hideEditBookmarkModal()
  }
}
