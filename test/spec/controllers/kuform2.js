'use strict';

describe('Controller: Kuform2Ctrl', function () {

  // load the controller's module
  beforeEach(module('yoApp'));

  var Kuform2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Kuform2Ctrl = $controller('Kuform2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
