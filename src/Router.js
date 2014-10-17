function Router() {
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
    var i = 0, len, route;
    path = urlToRelative( path );
    route = this.match( path );
    if( !route ) {
        return false;
    }
    len = route.callbacks.length;
    for( i; i < len; i++ ) {
        route.callbacks[i].call( route, route.params );
    }
};