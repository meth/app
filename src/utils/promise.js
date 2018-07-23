export const waitUntil = (callback, value, timeoutMs) =>
  new Promise(resolve => {
    let intervalTimer

    const timeoutTimer = setTimeout(() => {
      clearInterval(intervalTimer)

      resolve(false)
    }, timeoutMs)

    intervalTimer = setInterval(() => {
      if (callback() === value) {
        clearTimeout(timeoutTimer)
        clearInterval(intervalTimer)
        resolve(true)
      }
    }, 10 /* check every 10 ms */)
  })
