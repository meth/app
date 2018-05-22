import React from 'react'
import SvgQrCode from 'react-native-qrcode-svg'

const QrCode = ({ input, size }) => (
  <SvgQrCode value={input} size={size} />
)

export default QrCode
