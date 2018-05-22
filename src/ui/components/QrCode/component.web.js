import { QRCode as WebQRCode } from 'react-qr-svg'

const QrCode = ({ input, size, ...props }) => (
  <WebQRCode
    {...props}
    value={input}
    style={{
      width: size,
      height: size
    }}
  />
)

export default QrCode
