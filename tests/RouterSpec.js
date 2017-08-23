describe( "Router", function() {
    
    it( "should be able to add new routes", function() {
        var router = new Router();
        var callback = function() {
            console.log('callback');
        };
        router.route( '/route', callback );
        
        expect( router.routes.length ).toEqual( 1 );
        expect( router.routes[0].match('/route') ).toBeTruthy();
    });
    
    it( "should match the first matching route", function() {
        var router = new Router();
        router.route( '/route/123', function() {
            return '/route/123';
        } );
        router.route( '/route/:id', function() {
            return 'id';
        } );
        router.route( '/route/*', function() {
            return 'star';
        } );
        expect( router.match('/route/123').callbacks[0]() ).toEqual( '/route/123' );
        expect( router.match('/route/abc/123').callbacks[0]() ).toEqual( 'star' );
        expect( router.match('/route/id123').callbacks[0]() ).toEqual( 'id' );
    });

    it( "should call the route when a path is dispatched", function() {
        var router = new Router();
        var spy = jasmine.createSpy( "testFunc" );
        router.route( '/route/123', spy );
        router.dispatch( '/route/123' );
        expect( spy ).toHaveBeenCalled();
    });

    it( "should not throw an error when a non match route is passed", function() {
        var router = new Router();
        var spy = jasmine.createSpy( "testFunc" );
        router.route( '/route/123', spy );
        router.dispatch( '/abc' );
        expect( spy ).not.toHaveBeenCalled();
    });
    
    it( "should call the callbacks in the context of route", function() {
        var router = new Router();
        var func = function( params ) {
            expect( params.id ).toBe( '123' );
            expect( this.params.id ).toBe( '123' );
        };
        router.route( '/abc/:id', func );
        router.dispatch( '/abc/123' );
        
    });
    
    it( "should call all the given callbacks to a route", function() {
        var router = new Router();
        var spy1 = jasmine.createSpy( "testFunc1" );
        var spy2 = jasmine.createSpy( "testFunc2" );
        var spy3 = jasmine.createSpy( "testFunc3" );
        router.route( '/route', [spy1, spy2, spy3] );
        router.dispatch( '/route' );
        expect( spy1 ).toHaveBeenCalled();
        expect( spy2 ).toHaveBeenCalled();
        expect( spy3 ).toHaveBeenCalled();
    });

});
