## route.js
Simple frontend route handler, intended use with History.js or other single page web app. Inspired by Node Express.js. The path matching regex is directly taken from Express.js meaning any routes you use server side can be mapped to a frontend route.

##Use:
    var router = new Router()
    router.route( '/posts/:id', function( params ) {
	    // my route logic here
	    console.log( params.id );
    } );
    // you need to define your own dispatch logic
    // in this case we're using History.js
    History.Adapter.bind(window, 'statechange', function() {
        router.dispatch( History.getState().url );
    });
    