/**
 * Helper to extract Redux store values from this.props, ensure all immutables
 * are converted into mutables
 */
export const mutable = (props, ...keys) =>
  (keys || Object.keys(props)).reduce(
    (m, k) => ({
      ...m,
      [k]: (props[k] && props[k].toObject) ? props[k].toObject() : props[k]
    }),
    {}
  )
