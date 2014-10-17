/**
 * Path Regexp
 *
 * @param path:String - Route to match
 */
var PathRegexp = function(path, keys, sensitive, strict) {
    if (toString.call(path) == '[object RegExp]') return path;
    if (Array.isArray(path)) path = '(' + path.join('|') + ')';
    path = path
        .concat(strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){
            keys.push({ name: key, optional: !! optional });
            slash = slash || '';
            return ''
            + (optional ? '' : slash)
            + '(?:'
            + (optional ? slash : '')
            + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
            + (optional || '')
            + (star ? '(/*)?' : '');
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
};
/**
 * Initialize `Route` with the given `path`,
 * and an array of `callbacks` and `options`.
 *
 * Options:
 *
 *   - `sensitive`    enable case-sensitive routes
 *   - `strict`       enable strict matching for trailing slashes
 *
 * @param {String} path
 * @param {Array} callbacks
 * @param {Object} options.
 * @api private
 */

function Route( path, callbacks, options) {
    options = options || {};
    this.path = path;
    this.callbacks = callbacks;
    this.regexp = PathRegexp(path, this.keys = [], options.sensitive, options.strict);
}

/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

Route.prototype.match = function(path){
    var keys = this.keys,
        params = this.params = [],
        m = this.regexp.exec(path);
    
    if (!m) return false;
    
    for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];

        try {
            var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
        } catch(e) {
            var err = new Error("Failed to decode param '" + m[i] + "'");
            err.status = 400;
            throw err;
        }

        if (key) {
            params[key.name] = val;
        } else {
            params.push(val);
        }
        
    }
    
    return true;
};;function Router() {
    this.routes = [];
}

Router.prototype.route = function( path, callbacks ){
    // if callbacks is singular function wrap in array
    callbacks = typeof callbacks === 'function' ? [callbacks] : callbacks;

    // create the route
    var route = new Route( path, callbacks );

    // add it
    this.routes.push( route );
    return this;
};

Router.prototype.match = function( path ){
    var i = 0,
        len = this.routes.length,
        route = undefined;

    // matching routes
    for( i; i < len; i++ ) {
        route = this.routes[i];
        if ( route.match( path ) ) {
            return route;
        }
    }
};

Router.prototype.dispatch = function( path ) {
    var i = 0, len, route = this.match( path );
    if( !route ) {
        return false;
    }
    len = route.callbacks.length;
    for( i; i < len; i++ ) {
        route.callbacks[i].call( route, route.params );
    }
};