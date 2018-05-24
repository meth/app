import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-swiper-flatlist'
import PropTypes from 'prop-types'

import TouchableView from '../../../../../components/TouchableView'
import styles from './styles.ios'


class NavDots extends PureComponent {
  static propTypes = {
    scrollToIndex: PropTypes.func.isRequired,
    data: PropTypes.array,
    paginationIndex: PropTypes.number
  };

  static defaultProps = {
    data: [],
    paginationIndex: 0
  };

  render () {
    const {
      data,
      paginationIndex,
      scrollToIndex
    } = this.props

    return (
      <View style={styles.nav}>
        {data.map((_, index) => (
          <TouchableView
            style={
              (paginationIndex === index)
                ? styles.activeNavDot
                : styles.inactiveNavDot
            }
            key={index}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    )
  }
}


export default class CardsContainer extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    activeCard: PropTypes.number.isRequired,
    accounts: PropTypes.object.isRequired,
    renderCard: PropTypes.func.isRequired,
    renderAddAccountButton: PropTypes.func.isRequired,
    onSelectCard: PropTypes.func.isRequired
  }

  render () {
    const {
      accounts,
      activeCard,
      renderCard,
      renderAddAccountButton
    } = this.props

    const accountAddresses = Object.keys(accounts)

    return (
      <View style={styles.swiper}>
        <Swiper
          index={activeCard}
          showPagination={true}
          PaginationComponent={NavDots}
          onMomentumScrollEnd={this._onSelectCard}
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
      </View>
    )
  }

  _onSelectCard = ({ index }) => {
    const { onSelectCard } = this.props

    onSelectCard(index)
  }

  _renderCard (content, key) {
    return (
      <View key={key} style={styles.card}>
        {content}
      </View>
    )
  }
}
