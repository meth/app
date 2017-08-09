import React, { Component } from 'react'

import Modal from '../'
import styles from './styles'

export default class ConnectNode extends Component {
  render () {
    const ContainerDiv = styles.containerDiv()

    return (
      <Modal>
        <ContainerDiv>
          test
        </ContainerDiv>
      </Modal>
    )
  }
}
