import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Image as NativeImage } from 'react-native'

import Loading from '../Loading'
import TouchableView from '../TouchableView'
import styles from './styles'
import hardCoded from './hardCoded'


export default class Image extends PureComponent {
  static propTypes = {
    ...NativeImage.propTypes,
    id: PropTypes.string,
    style: PropTypes.any,
    onPress: PropTypes.func
  }

  state = {
    loading: true
  }

  render () {
    const { source, id, style, onPress, ...props } = this.props

    const { loading } = this.state

    if (source && source.uri) {
      return (
        <TouchableView style={style} onPress={onPress}>
          <NativeImage
            {...props}
            style={styles.image}
            source={source}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoadEnd}
          />
          {loading ? <Loading style={styles.loading} /> : null}
        </TouchableView>
      )
    }

    return (
      <TouchableView style={style} onPress={onPress}>
        <NativeImage
          source={hardCoded[id]}
          style={styles.image}
          {...props}
        />
      </TouchableView>
    )
  }

  _onLoadStart = () => {
    this.setState({
      loading: true
    })
  }

  _onLoadEnd = () => {
    this.setState({
      loading: false
    })
  }
}

Image.defaultProps = {
  resizeMode: 'contain'
}
