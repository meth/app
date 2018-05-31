import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './styles'
import ScrollView from '../../../../../../components/ScrollView'


export default class CardsContainer extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    accounts: PropTypes.object.isRequired,
    renderCard: PropTypes.func.isRequired,
    renderAddAccountButton: PropTypes.func.isRequired
  }

  render () {
    const { style, accounts, renderCard, renderAddAccountButton } = this.props
    const accountAddresses = Object.keys(accounts)

    return (
      <ScrollView
        style={[ styles.scrollView ].concat(style)}
        contentContainerStyle={styles.scrollViewContent}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {accountAddresses.map((address, index) => (
          renderCard(accounts, address, index)
        ))}
        {renderAddAccountButton()}
      </ScrollView>
    )
  }
}
