require("babel-register")

import Path from './Path'
import Router from './Router'




export default class Route {
  constructor(path, callbacks, options) {
    options = options || {}
    this.path = path
    this.callbacks = callbacks
    this.regexp = Path.regexp(path, this.keys = [], options.sensitive, options.strict)
  }
  
  match(path) {
    var keys = this.keys,
        params = this.params = [],
        m = this.regexp.exec(path)
    
    if (!m) return false
    
    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1]
      try {
        var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i]
      } catch(e) {
        var err = new Error(`Failed to decode param '${m[i]}'`)
        err.status = 400
        throw err
      }
      if (key) {
        params[key.name] = val
      } else {
        params.push(val)
      }
    }
    return true
  }
}

export { Route, Path, Router }