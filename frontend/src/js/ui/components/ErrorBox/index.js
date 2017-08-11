import _ from 'lodash'
import React, { Component } from 'react'

import { ERROR } from '../../../../../../common/constants'
import { t } from '../../../../../../common/strings'
import styles from './styles'

export default class ErrorBox extends Component {
  render () {
    const {
      error
    } = this.props

    const ContainerDiv = styles.containerDiv()

    let renderedError = '' + error

    if (_.get(error, 'message') === ERROR.METHOD_CALL_ERROR) {
      const { method, details } = error

      renderedError = (
        <div>
          <p>{t('error.methodCall', { method })}</p>
          { details ? <pre>{JSON.stringify(details, null, 2)}</pre> : null}
        </div>
      )
    }

    return (
      <ContainerDiv>
        {renderedError}
      </ContainerDiv>
    )
  }
}
