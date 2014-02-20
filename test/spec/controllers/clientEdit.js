'use strict';

describe('Controller: ClienteditCtrl', function () {

  // load the controller's module
  beforeEach(module('yoApp'));

  var ClienteditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClienteditCtrl = $controller('ClienteditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
