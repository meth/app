import { parseEnv, availableModes, log, STEPS } from '../utils'

const config = parseEnv({
  BUILD_MODE: {
    default: 'dev',
    allowed: availableModes()
  },
  INSTABUG: {
    default: false,
    sanitize: s => s.toLowerCase() === 'true'
  },
  ANALYTICS: {
    default: false,
    sanitize: s => s.toLowerCase() === 'true'
  },
  INC_BUILD_NUMBER: {
    default: false,
    sanitize: s => s.toLowerCase() === 'true'
  }
})

const { BUILD_MODE, INSTABUG, ANALYTICS } = config

log.alert(`Build mode: ${BUILD_MODE}`)
log.alert(`Instabug: ${INSTABUG ? 'on' : 'off'}`)
log.alert(`Analytics: ${ANALYTICS ? 'on' : 'off'}`)

log.alert('')

STEPS.forEach(step => step(config))

log.alert('')
log.alert('Setup complete.')
