import Machine from 'immutable-state-machine';


class FluxActionMachine extends Machine {
  constructor (cfg) {
    super(cfg, FluxActionMachine)
  }

  update(fluxAction) {
    let payload = fluxAction.payload || fluxAction,
      state = payload.state || payload,
      data = payload.data || null;

    return this.goto(state, data);
  }
}



export function createStandardMachine () {
  return new FluxActionMachine([
    {
      id: 'ready',
      from: ['success', 'error'],
      to: ['in_progress'],
    },
    {
      id: 'in_progress',
      from: ['success', 'error'],
      to: ['success', 'error'],
    },
    {
      id: 'success',
      from: ['in_progress'],
      to: ['ready', 'in_progress'],
    },
    {
      id: 'error',
      from: ['in_progress'],
      to: ['ready', 'in_progress'],
    },
  ]);
}
