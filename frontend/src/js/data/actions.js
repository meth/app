export const StateActions = [
  'INIT',
  'CONNECT_RPC',
].reduce((m, v) => {
  m[v] = v
  return m
}, {})


export const Actions = [
].reduce((m, v) => {
  m[v] = v
  return m
}, {})


export const buildAction = (type, payload = {}) => {
  if (payload && payload instanceof Error) {
    payload = {
      error: payload
    };
  }

  return {
    type: type,
    payload: payload,
  };
};
