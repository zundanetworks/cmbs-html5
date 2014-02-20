'use strict';

describe('Controller: FavouriteCtrl', function () {

  // load the controller's module
  beforeEach(module('yoApp'));

  var FavouriteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FavouriteCtrl = $controller('FavouriteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
