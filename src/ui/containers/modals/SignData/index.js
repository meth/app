import React, { PureComponent } from 'react'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Modal from '../../../components/Modal'
import Edit from './Edit'

import TitleText from '../../../components/TitleText'
import styles from './styles'


@connectStore('account')
export default class SignData extends PureComponent {
  constructor (props, ctx) {
    super(props, ctx)

    const { getSigning } = props.selectors
    const { address, data } = getSigning()

    this.state = {
      params: {
        address,
        data
      }
    }
  }

  render () {
    const { params } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        contentScrollContainerStyle={styles.scrollContainerContent}
        onPressCloseButton={this._dismissModal}
      >
        <TitleText
          style={styles.titleText}
          text={t('title.signData')}
        />
        <Edit params={params} onGeneratedSignature={this._onGeneratedSignature} />
      </Modal>
    )
  }

  _onGeneratedSignature = (__, signature) => {
    this._dismissModal(signature)
  }

  _dismissModal = signature => {
    const { cancelSignData, hideSignDataModal } = this.props.actions

    // only cancel if not succeeded
    if (!signature) {
      cancelSignData(t('error.userCancelledDataSigning'))
    } else {
      hideSignDataModal()
    }
  }
}
