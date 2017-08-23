describe( "Route", function() {
    
    it( "should match a given simple path /route", function() {
        var r = new Route( '/route' );
        expect( r.match( '/route' ) ).toBeTruthy();
    });
    
    it( "should populate match parameters in Path", function() {
        var r = new Route( '/route/:id' );
        expect( r.match( '/route/123' ) ).toBeTruthy();
        expect( r.match( '/route/asdf' ) ).toBeTruthy();
    });

    it( "should match sta patterns", function() {
        var r = new Route( '/route/*' );
        expect( r.match( '/route/asdf' ) ).toBeTruthy();
        expect( r.match( '/route/asdf/123' ) ).toBeTruthy();
    });
    
    it( "should extract params from Path", function() {
        var r = new Route( '/route/:id' );
        r.match( '/route/123' );
        expect( r.params.id ).toEqual( '123' );
    });

});
