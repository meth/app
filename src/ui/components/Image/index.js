import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Image as NativeImage, View } from 'react-native'

import Loading from '../Loading'
import styles from './styles'
import hardCoded from './hardCoded'


export default class Image extends PureComponent {
  static propTypes = {
    ...NativeImage.propTypes,
    id: PropTypes.string
  }

  state = {
    loading: true
  }

  render () {
    const { source, id, style, ...props } = this.props

    const { loading } = this.state

    if (source && source.uri) {
      return (
        <View style={style}>
          <NativeImage
            {...props}
            style={[ styles.image, style ]}
            source={source}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoadEnd}
          />
          {loading ? <Loading style={styles.loading} /> : null}
        </View>
      )
    }

    return (
      <NativeImage
        source={hardCoded[id]}
        style={style}
        {...props}
      />
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
