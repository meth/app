import { Alert, Linking } from 'react-native'

const alertUser = msg => Alert.alert(msg)

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
  alertUser,
  openExternalUrl: url => openExternalUrl(url, log)
})
