import React from 'react'

import Image from '../Image'
import { styles, resizeMode } from './styles'

const SplashBackgroundImage = () => (
  <Image id='splash' style={styles.bgImage} resizeMode={resizeMode}/>
)

export default SplashBackgroundImage
