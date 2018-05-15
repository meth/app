import React from 'react'
import SvgQrCode from 'react-native-qrcode-svg'

const QrCode = ({ input }) => (
  <SvgQrCode value={input} />
)

export default QrCode
