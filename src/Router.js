import Path from './Path'

export default class Router {
  constructor() {
    this.routes = []
  }
  
  route(path, callbacks) {
    callbacks = typeof callbacks === 'function' ? [callbacks] : callbacks
    let route = new Route( path, callbacks )
    this.routes.push( route )
    return this
  }
  
  match(path) {
    var i = 0, len = this.routes.length, route
    for(i; i < len; i++) {
      route = this.routes[i]
      if (route.match(path)) {
        return route
      }
    }
  }
  
  dispatch(path) {
    var i = 0, len, route
    path = Path.urlToRelative( path )
    route = this.match( path )
    if(!route) {
      return false
    }
    len = route.callbacks.length
    for( i; i < len; i++ ) {
      route.callbacks[i].call( route, route.params )
    }
  }
}
  