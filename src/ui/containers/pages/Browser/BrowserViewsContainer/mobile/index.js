import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Animated } from 'react-native'
import CoverFlow from '@meth/react-native-coverflow'

import { getWindowDimensions } from '../../../../../styles'
import Button from '../../../../../components/Button'
import IconButton from '../../../../../components/IconButton'
import styles from './styles'


const { width, height } = getWindowDimensions()

const ANIMATION_DURATION = 100

const FULLVIEW_CARD_TOP_MARGIN = 0
const FULLVIEW_CARD_WIDTH = width
const FULLVIEW_CARD_HEIGHT = height - 20

const COVERFLOW_CARD_TOP_MARGIN = 50
const COVERFLOW_CARD_WIDTH = width * 0.5
const COVERFLOW_CARD_HEIGHT = height * 0.5


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
    coverFlowMode: false,
    cardMarginTop: new Animated.Value(FULLVIEW_CARD_TOP_MARGIN),
    cardWidth: new Animated.Value(FULLVIEW_CARD_WIDTH),
    cardHeight: new Animated.Value(FULLVIEW_CARD_HEIGHT)
  }

  render () {
    const { views, activeIndex } = this.props
    const { coverFlowMode, cardWidth, cardHeight, cardMarginTop } = this.state

    /*
    Note: we still render all views in non-cover-flow mode to prevent React
    from re-mounting them when switching between coverflow and non-coverflow
    (see https://github.com/reactjs/rfcs/pull/34)
    */

    return (
      <View style={styles.container}>
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
          disableInteraction={!coverFlowMode}
        >
          {views.map(({ id, renderedChild }, index) => (
            <Animated.View
              key={id}
              style={{
                position: 'relative',
                top: cardMarginTop,
                width: cardWidth,
                height: cardHeight
              }}
            >
              {React.cloneElement(renderedChild, {
                renderAfterAddressInput: (index === activeIndex && !coverFlowMode)
                  ? this._renderAfterAddressInput
                  : null
              })}
              {coverFlowMode ? <View style={styles.cardBlockingOverlay} /> : null}
            </Animated.View>
          ))}
        </CoverFlow>
        {coverFlowMode ? this._renderCoverFlowNav() : null}
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
      <Button
        style={styles.tabsButton}
        type='textWithBorder'
        title={`${views.length}`}
        onPress={this._showCoverFlow}
      />
    )
  }

  _showCoverFlow = () => {
    const { activeIndex } = this.props

    this.setState({
      coverFlowMode: true,
      coverFlowIndex: activeIndex
    }, () => {
      this._animateCardDimensions(
        COVERFLOW_CARD_TOP_MARGIN,
        COVERFLOW_CARD_WIDTH,
        COVERFLOW_CARD_HEIGHT
      )
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

    this._animateCardDimensions(
      FULLVIEW_CARD_TOP_MARGIN,
      FULLVIEW_CARD_WIDTH,
      FULLVIEW_CARD_HEIGHT,
      () => {
        this.setState({
          coverFlowMode: false
        })
      }
    )
  }

  _onClose = () => {
    const { coverFlowIndex } = this.state
    const { views, onClose } = this.props

    onClose(views[coverFlowIndex].id)
  }

  _animateCardDimensions (newMarginTop, newWidth, newHeight, cb) {
    const { cardWidth, cardHeight, cardMarginTop } = this.state

    Animated.parallel([
      Animated.timing(cardMarginTop, {
        toValue: newMarginTop,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(cardWidth, {
        toValue: newWidth,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(cardHeight, {
        toValue: newHeight,
        duration: ANIMATION_DURATION
      })
    ]).start(cb)
  }
}
