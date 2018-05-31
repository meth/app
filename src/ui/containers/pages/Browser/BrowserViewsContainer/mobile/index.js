import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import CoverFlow from 'react-native-coverflow'

import Button from '../../../../../components/Button'
import styles from './styles'


export default class MobileBrowserViewsContainer extends PureComponent {
  static propTypes = {
    views: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      active: PropTypes.bool,
      renderedChild: PropTypes.element
    })),
    style: PropTypes.any,
    onSelectView: PropTypes.func.isRequired
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
      <View style={styles.container}>
        <CoverFlow
          initialSelection={activeIndex}
          spacing={150}
          rotation={50}
          midRotation={50}
          scaleDown={0.95}
          scaleFurther={0.9}
          onChange={() => {}}
          onPress={this._onSelectCard}
        >
          {views.map(({ id, renderedChild }) => (
            <View key={id} style={styles.card}>
              {renderedChild}
            </View>
          ))}
        </CoverFlow>
      </View>
    )
  }

  _renderAfterAddressInput = () => {
    const { views } = this.props

    return (
      <View style={styles.tabsButtonContainer}>
        <Button
          type='textWithBorder'
          title={`${views.length}`}
          onPress={this._showCoverFlow}
        />
      </View>
    )
  }

  _showCoverFlow = () => {
    this.setState({
      coverFlowMode: true
    })
  }

  _onSelectCard = index => {
    const { onSelectView, views } = this.props

    onSelectView(views[index].id)

    this.setState({
      coverFlowMode: false
    })
  }
}
