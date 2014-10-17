describe( "PathRegexp", function() {
    
    it( "should return a new RegEx to match given path", function() {
        var pathx = PathRegexp( '/route' );
        expect( pathx.exec( '/route' ) ).toBeTruthy();
        expect( pathx.exec( '/Route' ) ).toBeTruthy();
        expect( pathx.exec( '/Route/' ) ).toBeTruthy();
        
        pathx = PathRegexp( '/route/abc' );
        expect( pathx.exec( '/route/abc' ) ).toBeTruthy();
        expect( pathx.exec( '/route/123' ) ).toBeFalsy();
    });

    it( "should match parameterised urls", function() {
        var pathx = PathRegexp( '/route/:id', [] );
        expect( pathx.exec( '/route/abc' ) ).toBeTruthy();
        expect( pathx.exec( '/route/123' ) ).toBeTruthy();
    });
    
    it( "should match optional params", function() {
        var pathx = PathRegexp( '/route/:id?', [] );
        expect( pathx.exec( '/route' ) ).toBeTruthy();
        expect( pathx.exec( '/route/123' ) ).toBeTruthy();
    });
    
    it( "should match all for * star", function() {
        var pathx = PathRegexp( '/route/*' );
        expect( pathx.exec( '/route/abc' ) ).toBeTruthy();
        expect( pathx.exec( '/route/123/abc' ) ).toBeTruthy();
    });
    
    xit( "", function() {
        expect(  ).toEqual(  );
    });

});
