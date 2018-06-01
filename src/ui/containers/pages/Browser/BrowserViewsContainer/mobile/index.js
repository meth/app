import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import CoverFlow from 'react-native-coverflow'

import Button from '../../../../../components/Button'
import IconButton from '../../../../../components/IconButton'
import styles from './styles'


export default class MobileBrowserViewsContainer extends PureComponent {
  static propTypes = {
    views: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      active: PropTypes.bool,
      renderedChild: PropTypes.element
    })),
    style: PropTypes.any,
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  }

  state = {
    coverFlowMode: false
  }

  render () {
    const { views, activeIndex } = this.props
    const { coverFlowMode } = this.state

    if (!coverFlowMode) {
      return (
        React.cloneElement(views[activeIndex].renderedChild, {
          renderAfterAddressInput: this._renderAfterAddressInput
        })
      )
    }

    return (
      <View style={styles.coverFlowContainer}>
        <CoverFlow
          style={styles.coverFlow}
          initialSelection={activeIndex}
          wingSpan={38}
          spacing={150}
          rotation={70}
          midRotation={50}
          perspective={790}
          onChange={this._onChangeCard}
          onPress={this._onSelectCard}
        >
          {views.map(({ id, renderedChild }) => (
            <View key={id} style={styles.card}>
              {renderedChild}
              <View style={styles.cardBlockingOverlay} />
            </View>
          ))}
        </CoverFlow>
        {this._renderCoverFlowNav()}
      </View>
    )
  }

  _renderCoverFlowNav () {
    const { coverFlowIndex } = this.state
    const { views } = this.props

    const dots = []
    for (let i = 0; views.length > i; i += 1) {
      dots.push(
        <View
          key={i}
          style={[ styles.navDot ].concat(coverFlowIndex === i ? styles.activeNavDot : null)}
        />
      )
    }

    return (
      <View style={styles.cardsNav}>
        <IconButton
          style={styles.closeButton}
          onPress={this._onClose}
          icon={{ name: 'close' }}
        />
        <View style={styles.navDots}>
          {dots}
        </View>
      </View>
    )
  }

  _renderAfterAddressInput = () => {
    const { views } = this.props

    return (
      <View style={styles.tabsButtonContainer}>
        <Button
          style={styles.tabsButton}
          type='textWithBorder'
          title={`${views.length}`}
          onPress={this._showCoverFlow}
        />
      </View>
    )
  }

  _showCoverFlow = () => {
    const { activeIndex } = this.props

    this.setState({
      coverFlowMode: true,
      coverFlowIndex: activeIndex
    })
  }

  _onChangeCard = index => {
    this.setState({
      coverFlowIndex: index
    })
  }

  _onSelectCard = index => {
    const { onSelect, views } = this.props

    onSelect(views[index].id)

    this.setState({
      coverFlowMode: false
    })
  }

  _onClose = () => {
    const { coverFlowIndex } = this.state
    const { views, onClose } = this.props

    onClose(views[coverFlowIndex].id)
  }
}
