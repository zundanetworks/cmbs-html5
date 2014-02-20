'use strict';

describe('Directive: fileChange', function () {

  // load the directive's module
  beforeEach(module('yoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-change></file-change>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fileChange directive');
  }));
});
