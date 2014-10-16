describe( "PathRegexp", function() {
    
    it( "should return a new RegEx to match given path", function() {
        var pathx = PathRegexp( '/route' );
        console.log(pathx.exec( '/route' ))
        expect( pathx.exec( '/route' ).length ).toBeTruthy();
    });

    xit( "", function() {
        expect(  ).toEqual(  );
    });

});
