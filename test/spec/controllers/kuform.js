'use strict';

describe('Controller: KuformCtrl', function () {

  // load the controller's module
  beforeEach(module('yoApp'));

  var KuformCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KuformCtrl = $controller('KuformCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
