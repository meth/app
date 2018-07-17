import { Alert, Linking } from 'react-native'

const alert = msg => Alert.alert(msg)

const openExternalUrl = (url, log) => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        return log.warn(`Can't handle URL: ${url}`)
      }

      return Linking.openURL(url)
    })
    .catch(err => log.error(err))
}

export default ({ log }) => ({
  alert,
  openExternalUrl: url => openExternalUrl(url, log)
})
