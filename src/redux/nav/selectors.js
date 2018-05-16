import _ from 'lodash'

export const getCurrentRoute = state => {
  let route = state.nav

  while (_.get(route, 'routes.length') && undefined !== route.index) {
    route = route.routes[route.index]
  }

  return route
}
