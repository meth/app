import Machine from 'immutable-state-machine'

class StateActionMachine extends Machine {
  constructor (cfg) {
    super(cfg, StateActionMachine)
  }

  update (fluxAction) {
    const payload = fluxAction.payload || fluxAction
    const state = payload.state || payload
    const data = payload.data || null

    return this.goto(state, data)
  }
}

export const ready = 'ready'
export const inProgress = 'inProgress'
export const success = 'success'
export const error = 'error'

export const createStateActionMachine = () =>
  new StateActionMachine([
    {
      id: ready
    },
    {
      id: inProgress
    },
    {
      id: success
    },
    {
      id: error
    }
  ])
