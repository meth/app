import React, { PureComponent } from 'react'

import Button from '../Button'
import Icon from '../Icon'
import createStyles from './styles'

export default class IconButton extends PureComponent {
  render () {
    const { icon, ...props } = this.props

    const styles = createStyles(props)

    return (
      <Button {...props}>
        <Icon {...icon} style={styles.icon} />
      </Button>
    )
  }
}
