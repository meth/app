import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-swiper'
import PropTypes from 'prop-types'

import styles from './styles.ios'

export default class CardsContainer extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    accounts: PropTypes.object.isRequired,
    renderCard: PropTypes.func.isRequired,
    renderAddAccountButton: PropTypes.func.isRequired,
    onSelectCard: PropTypes.func.isRequired
  }

  render () {
    const {
      accounts,
      renderCard,
      renderAddAccountButton,
      onSelectCard
    } = this.props
    const accountAddresses = Object.keys(accounts)

    return (
      <Swiper
        style={styles.swiper}
        loop={false}
        onIndexChanged={onSelectCard}
        showsPagination={true}
        paginationStyle={styles.nav}
        dotStyle={styles.navDot}
        activeDotStyle={styles.activeNavDot}
      >
        {accountAddresses.map((address, index) => (
          this._renderCard(
            renderCard(accounts, address, index), address
          )
        )).concat(
          this._renderCard(
            renderAddAccountButton(), 'addButton'
          )
        )}
      </Swiper>
    )
  }

  _renderCard (content, key) {
    return (
      <View key={key} style={styles.card}>
        {content}
      </View>
    )
  }
}
