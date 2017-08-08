import Machine from 'immutable-state-machine'


class StateActionMachine extends Machine {
  constructor (cfg) {
    super(cfg, StateActionMachine)
  }

  update (fluxAction) {
    let payload = fluxAction.payload || fluxAction,
      state = payload.state || payload,
      data = payload.data || null

    return this.goto(state, data)
  }
}

export const ready = 'ready'
export const inProgress = 'inProgress'
export const success = 'success'
export const error = 'error'

export const createStateActionMachine = () => {
  return new StateActionMachine([
    {
      id: ready,
      from: [success, error],
      to: [inProgress, success, error]
    },
    {
      id: inProgress,
      from: [ready, success, error],
      to: [success, error]
    },
    {
      id: success,
      from: [ready, inProgress],
      to: [ready, inProgress]
    },
    {
      id: error,
      from: [ready, inProgress],
      to: [ready, inProgress]
    }
  ])
}
