describe( "Route", function() {
    
    it( "should match a given simple path /route", function() {
        var r = new Route( '/route' );
        expect( r.match( '/route' ) ).toBeTruthy();
    });

    xit( "", function() {
        expect(  ).toEqual(  );
    });

});
