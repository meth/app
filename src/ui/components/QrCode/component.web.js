import React from 'react'
import { QRCode as WebQRCode } from 'react-qr-svg'

const QrCodeComponent = ({ input, size, ...props }) => (
  <WebQRCode
    {...props}
    value={input}
    style={{
      width: size,
      height: size
    }}
  />
)

export default QrCodeComponent
